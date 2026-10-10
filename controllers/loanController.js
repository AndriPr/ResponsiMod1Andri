const supabase = require('../config/supabase');

// Create a new loan
exports.createLoan = async (req, res) => {
    try {
        const { member_name, book_title, borrow_date, return_date, status } = req.body;
        const { data, error } = await supabase
            .from('loans')
            .insert([{ member_name, book_title, borrow_date, return_date, status }])
            .select();

        if (error) throw error;
        res.status(201).json({ message: 'Loan created successfully', data: data[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all loans (with optional filter by status)
exports.getLoans = async (req, res) => {
    try {
        const { status } = req.query;
        let query = supabase.from('loans').select('*');

        if (status) {
            query = query.eq('status', status);
        }

        const { data, error } = await query;
        if (error) throw error;
        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get loan by ID
exports.getLoanById = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase
            .from('loans')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                return res.status(404).json({ error: 'Loan not found' });
            }
            throw error;
        }
        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update loan
exports.updateLoan = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const { data, error } = await supabase
            .from('loans')
            .update(updates)
            .eq('id', id)
            .select();

        if (error) throw error;
        if (data.length === 0) return res.status(404).json({ error: 'Loan not found' });
        
        res.status(200).json({ message: 'Loan updated successfully', data: data[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete loan
exports.deleteLoan = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase
            .from('loans')
            .delete()
            .eq('id', id)
            .select();

        if (error) throw error;
        if (data.length === 0) return res.status(404).json({ error: 'Loan not found' });

        res.status(200).json({ message: 'Loan deleted successfully', data: data[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
