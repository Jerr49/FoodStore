import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
  CircularProgress,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Avatar
} from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import { menuAPI } from '../../api/Menu';

const AddMenuItem = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: null,
    imagePreview: '',
    categoryId: ''
  });
  const [loading, setLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await menuAPI.getCategories();
        setCategories(response.data);
        if (response.data.length > 0) {
          setFormData(prev => ({ ...prev, categoryId: response.data[0]._id }));
        }
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError('Failed to load categories');
      } finally {
        setCategoriesLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: file,
          imagePreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', parseFloat(formData.price));
      formDataToSend.append('categoryId', formData.categoryId);
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      await menuAPI.addMenuItem(formDataToSend);
      setSuccess('Menu item added successfully!');
      setFormData({
        name: '',
        description: '',
        price: '',
        image: null,
        imagePreview: '',
        categoryId: categories[0]?._id || ''
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add menu item');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Add New Menu Item
      </Typography>
      
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      
      <Box component="form" onSubmit={handleSubmit} encType="multipart/form-data">
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Category</InputLabel>
          <Select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            disabled={categoriesLoading}
            label="Category"
          >
            {categoriesLoading && (
              <MenuItem disabled>
                <CircularProgress size={24} />
              </MenuItem>
            )}
            {categories.map(category => (
              <MenuItem key={category._id} value={category._id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
        <TextField
          fullWidth
          margin="normal"
          label="Item Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        
        <TextField
          fullWidth
          margin="normal"
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          multiline
          rows={3}
          required
        />
        
        <TextField
          fullWidth
          margin="normal"
          label="Price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          inputProps={{ min: 0, step: 0.01 }}
          required
        />
        
        <Box sx={{ mt: 2, mb: 2 }}>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="menu-item-image-upload"
            type="file"
            onChange={handleImageChange}
          />
          <label htmlFor="menu-item-image-upload">
            <Button
              variant="outlined"
              component="span"
              startIcon={<CloudUpload />}
              fullWidth
            >
              Upload Image
            </Button>
          </label>
          {formData.imagePreview && (
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
              <Avatar
                src={formData.imagePreview}
                alt="Preview"
                sx={{ width: 150, height: 150 }}
                variant="rounded"
              />
            </Box>
          )}
        </Box>
        
        <Box sx={{ mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            disabled={loading || categoriesLoading || !formData.image}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {loading ? 'Adding...' : 'Add Menu Item'}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default AddMenuItem;