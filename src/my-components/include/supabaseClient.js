import {createClient} from '@supabase/supabase-js';

const supabaseUrl = 'https://flknsoowaburkerpeohj.supabase.co';
const supabaseAnonKey = 'sb_publishable_dVaT4sIipvqdIu1b8afLLA_ihn7tSK9';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);