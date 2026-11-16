import { useEffect, useState } from 'react';
import { supabase } from '../include/supabaseClient';

function Demo2() {
    const [user, setUser] = useState(null);
    const [mode, setMode] = useState('signIn');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase.auth.getSession().then(({ data, error }) => {
            if (error) setMessage(error.message);
            setUser(data?.session?.user ?? null);
            setLoading(false);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, session) => setUser(session?.user ?? null)
        );
        return () => subscription.unsubscribe();
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();
        setMessage('');

        const { data, error } = mode === 'signIn'
            ? await supabase.auth.signInWithPassword({ email, password })
            : await supabase.auth.signUp({ email, password });

        if (error) {
            setMessage(error.message);
        } else if (mode === 'signUp' && !data.session) {
            setMode('signIn');
            setMessage('Check your email to confirm your account, then sign in.');
        } else {
            setMessage(mode === 'signUp' ? 'Account created.' : 'Signed in.');
        }
    }

    async function handleSignOut() {
        const { error } = await supabase.auth.signOut();
        setMessage(error ? error.message : 'Signed out.');
    }

    if (loading) return <p className="text-center">Loading account...</p>;

    return (
        <div className="card mx-auto my-4" style={{ maxWidth: '420px' }}>
            <div className="card-body">
                {user ? (
                    <>
                        <h2 className="h5">Signed in</h2>
                        <p>{user.email}</p>
                        <button className="btn btn-outline-primary" onClick={handleSignOut}>
                            Sign out
                        </button>
                    </>
                ) : (
                    <>
                        <h2 className="h4">{mode === 'signIn' ? 'Sign in' : 'Create account'}</h2>
                        <div className="mb-3">
                            <button
                                className="btn btn-link ps-0"
                                type="button"
                                onClick={() => {
                                    setMode(mode === 'signIn' ? 'signUp' : 'signIn');
                                    setMessage('');
                                }}
                            >
                                {mode === 'signIn' ? 'Need an account? Sign up' : 'Already registered? Sign in'}
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="demo2-email">Email</label>
                                <input
                                    className="form-control"
                                    id="demo2-email"
                                    type="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="demo2-password">Password</label>
                                <input
                                    className="form-control"
                                    id="demo2-password"
                                    type="password"
                                    autoComplete={mode === 'signIn' ? 'current-password' : 'new-password'}
                                    minLength="6"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    required
                                />
                            </div>
                            <button className="btn btn-primary" type="submit">
                                {mode === 'signIn' ? 'Sign in' : 'Sign up'}
                            </button>
                        </form>
                    </>
                )}
                {message && <p className="mt-3 mb-0" role="status">{message}</p>}
            </div>
        </div>
    );
}

export default Demo2;
