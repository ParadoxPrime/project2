import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../include/supabaseClient';

const COMMENT_MAX_LENGTH = 1000;

function Demo3() {
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [commentsLoading, setCommentsLoading] = useState(true);
    const [commentsError, setCommentsError] = useState(false);
    const [comment, setComment] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('status');

    const loadComments = useCallback(async () => {
        setCommentsLoading(true);
        const { data, error } = await supabase
            .from('demo3_comments')
            .select('id, user_id, body, created_at')
            .order('created_at', { ascending: false })
            .limit(100);

        if (error) {
            setCommentsError(true);
            setMessage(`Unable to load comments: ${error.message}`);
            setMessageType('error');
        } else {
            setCommentsError(false);
            setComments(data);
            setMessage(currentMessage =>
                currentMessage.startsWith('Unable to load comments:') ? '' : currentMessage
            );
        }
        setCommentsLoading(false);
    }, []);

    useEffect(() => {
        let isMounted = true;
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                if (isMounted) setUser(session?.user ?? null);
            }
        );

        supabase.auth.getSession().then(({ data, error }) => {
            if (!isMounted) return;
            if (error) {
                setMessage(`Unable to check your sign-in status: ${error.message}`);
                setMessageType('error');
            }
            setUser(data?.session?.user ?? null);
            setAuthLoading(false);
        });

        return () => {
            isMounted = false;
            subscription.unsubscribe();
        };
    }, []);

    useEffect(() => {
        loadComments();
    }, [loadComments]);

    async function handleSubmit(event) {
        event.preventDefault();
        if (!user || submitting) return;

        const body = comment.trim();
        if (!body) {
            setMessage('Write a comment before posting.');
            setMessageType('error');
            return;
        }

        setSubmitting(true);
        setMessage('');
        const { data, error } = await supabase
            .from('demo3_comments')
            .insert({ user_id: user.id, body })
            .select('id, user_id, body, created_at')
            .single();

        if (error) {
            setMessage(`Unable to post your comment: ${error.message}`);
            setMessageType('error');
        } else {
            setComments(currentComments => [data, ...currentComments]);
            setComment('');
            setMessage('Your comment was posted.');
            setMessageType('status');
        }
        setSubmitting(false);
    }

    return (
        <section className="demo3-forum" aria-labelledby="demo3-forum-title">
            <header className="demo3-forum-header">
                <div>
                    <h2 id="demo3-forum-title">Discussion Board</h2>
                </div>
                <span className="demo3-comment-count">
                    {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
                </span>
            </header>

            {authLoading ? (
                <p className="demo3-muted" role="status">Checking your account...</p>
            ) : user ? (
                <form className="demo3-comment-form" onSubmit={handleSubmit}>
                    <label htmlFor="demo3-comment">Add to the discussion</label>
                    <textarea
                        id="demo3-comment"
                        value={comment}
                        onChange={event => setComment(event.target.value)}
                        maxLength={COMMENT_MAX_LENGTH}
                        placeholder="What would you like to share?"
                        rows={3}
                        required
                    />
                    <div className="demo3-form-footer">
                        <span className="demo3-muted">
                            Posting as {user.email || 'signed-in user'} · {comment.length}/{COMMENT_MAX_LENGTH}
                        </span>
                        <button type="submit" disabled={submitting || !comment.trim()}>
                            {submitting ? 'Posting...' : 'Post comment'}
                        </button>
                    </div>
                </form>
            ) : (
                <p className="demo3-sign-in-note">
                    Sign in or create an account in Demo 2 to join the discussion.
                </p>
            )}

            {message && (
                <p className={`demo3-message ${messageType === 'error' ? 'is-error' : ''}`} role="status">
                    {message}
                </p>
            )}

            <div className="demo3-comments" aria-live="polite">
                {commentsLoading ? (
                    <p className="demo3-muted">Loading comments...</p>
                ) : commentsError ? (
                    <p className="demo3-muted">Comments are unavailable until they can be loaded.</p>
                ) : comments.length === 0 ? (
                    <p className="demo3-muted">No comments yet. Start the conversation.</p>
                ) : (
                    comments.map(item => (
                        <article className="demo3-comment" key={item.id}>
                            <div className="demo3-comment-meta">
                                <span>Member {item.user_id.slice(0, 8)}</span>
                                <time dateTime={item.created_at}>
                                    {new Date(item.created_at).toLocaleString()}
                                </time>
                            </div>
                            <p>{item.body}</p>
                        </article>
                    ))
                )}
            </div>

            {!commentsLoading && commentsError && (
                <button className="demo3-retry" type="button" onClick={loadComments}>
                    Try loading comments again
                </button>
            )}
        </section>
    );
}

export default Demo3;