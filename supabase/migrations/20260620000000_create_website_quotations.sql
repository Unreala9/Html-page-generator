-- Create website_quotations table
CREATE TABLE IF NOT EXISTS public.website_quotations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    project_name TEXT NOT NULL,
    website_type TEXT NOT NULL,
    budget TEXT NOT NULL,
    reference_url TEXT,
    raw_blueprint TEXT NOT NULL,
    parsed_data JSONB NOT NULL,
    data JSONB,
    status TEXT NOT NULL DEFAULT 'Pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.website_quotations ENABLE ROW LEVEL SECURITY;

-- Allow public insertion (for the quote request form)
CREATE POLICY "Allow public insert" ON public.website_quotations
    FOR INSERT WITH CHECK (true);

-- Allow public read, update, and delete for admin access 
-- (Ensures compatability with the client-side admin password login)
CREATE POLICY "Allow public select" ON public.website_quotations
    FOR SELECT USING (true);

CREATE POLICY "Allow public update" ON public.website_quotations
    FOR UPDATE USING (true);

CREATE POLICY "Allow public delete" ON public.website_quotations
    FOR DELETE USING (true);

-- Create trigger function to sync 'data' and 'parsed_data' JSONB columns
CREATE OR REPLACE FUNCTION sync_quotation_data_columns()
RETURNS TRIGGER AS $$
BEGIN
    -- If data is updated/inserted and parsed_data is not, sync it
    IF NEW.data IS NOT NULL AND (NEW.parsed_data IS NULL OR NEW.parsed_data = '{}'::jsonb) THEN
        NEW.parsed_data := NEW.data;
    -- If parsed_data is updated/inserted and data is not, sync it
    ELSIF NEW.parsed_data IS NOT NULL AND (NEW.data IS NULL OR NEW.data = '{}'::jsonb) THEN
        NEW.data := NEW.parsed_data;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to run before insert or update
DROP TRIGGER IF EXISTS trigger_sync_quotation_data ON public.website_quotations;
CREATE TRIGGER trigger_sync_quotation_data
    BEFORE INSERT OR UPDATE ON public.website_quotations
    FOR EACH ROW
    EXECUTE FUNCTION sync_quotation_data_columns();
