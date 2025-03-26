// src/api/menu.js
import Api from './Api';

export const menuAPI = {
  // Category Management
  createCategory: async (categoryData) => {
    try {
      const response = await Api.post('/menu/categories', categoryData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        // Handle unauthorized access (token expired)
        throw new Error('Session expired. Please login again.');
      } else if (error.response?.status === 403) {
        // Handle forbidden access (not admin)
        throw new Error('You do not have permission to perform this action.');
      }
      console.error('Failed to create category:', error);
      throw new Error(error.response?.data?.message || 'Failed to create category');
    }
  },

  getCategories: async () => {
    try {
      const response = await Api.get('/menu/categories');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch categories');
    }
  },

  // Menu Item Management
  addMenuItem: async (itemData) => {
    try {
      const response = await Api.post('/menu/items', itemData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        throw new Error('Session expired. Please login again.');
      } else if (error.response?.status === 403) {
        throw new Error('You do not have permission to add menu items.');
      } else if (error.response?.status === 404) {
        throw new Error('Category not found');
      }
      console.error('Failed to add menu item:', error);
      throw new Error(error.response?.data?.message || 'Failed to add menu item');
    }
  },

  getMenu: async () => {
    try {
      const response = await Api.get('/menu');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch menu:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch menu');
    }
  },

  // Additional methods
  updateMenuItem: async (itemId, updateData) => {
    try {
      const response = await Api.patch(`/menu/items/${itemId}`, updateData);
      return response.data;
    } catch (error) {
      console.error('Failed to update menu item:', error);
      throw new Error(error.response?.data?.message || 'Failed to update menu item');
    }
  },

  deleteMenuItem: async (itemId) => {
    try {
      const response = await Api.delete(`/menu/items/${itemId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to delete menu item:', error);
      throw new Error(error.response?.data?.message || 'Failed to delete menu item');
    }
  }
};