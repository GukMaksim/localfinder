export const handleSearch = async (req, res) => {
    const query = req.query.q;
    if (!query) return res.status(400).json({ error: 'Missing query parameter' });
  
    // TODO: call query parser, geocoding, and Google Places search
    res.json({ message: `Received query: ${query}` });
  };
