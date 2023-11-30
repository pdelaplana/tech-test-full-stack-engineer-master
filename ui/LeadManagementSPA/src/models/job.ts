export interface Job
{
    id: number;
    status: JobStatus;
    suburb_id: number;
    category_id: number;
    contact_name: string;
    contact_phone: string;
    contact_email: string;
    price: number;
    description: string;
    created_at: Date;
    updated_at: Date;
    category: string;
    suburb: string;
    postcode: string;
}
