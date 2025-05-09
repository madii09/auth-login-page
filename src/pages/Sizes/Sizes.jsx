import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const Sizes = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [size, setSize] = useState('');
  const [clickId, setClickId] = useState();
  const token = localStorage.getItem('accesstokenn');

  const getCategory = () => {
    fetch('https://back.ifly.com.uz/api/sizes')
      .then((res) => res.json())
      .then((item) => setData(item?.data));
  };

  useEffect(() => {
    getCategory();
  }, []);

  const createCategory = (event) => {
    event.preventDefault();
    fetch('https://back.ifly.com.uz/api/sizes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        size: size,
      }),
    })
      .then((response) => response.json())
      .then((item) => {
        if (item?.success) {
          toast.success('Successful');
          getCategory();
          setModalOpen(false);
        } else {
          toast.error('Failed');
        }
      });
  };
  const deleteCategory = (id) => {
    fetch(`https://back.ifly.com.uz/api/sizes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response?.success) {
          toast.success('Category deleted');
          getCategory();
        } else {
          toast.error(response?.message || 'Failed to delete category.');
        }
      });
  };

  const editCategory = (e) => {
    e.preventDefault();
    fetch(`https://back.ifly.com.uz/api/sizes/${clickId}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        size: size,
      }),
    })
      .then((res) => res.json())
      .then((item) => {
        if (item?.success) {
          toast.success('Edit Successful');
          /////////here
          getCategory();
          setEditModalOpen(false);
        } else {
          toast.error('Edit Failed');
        }
      });
  };
  return (
    <div className='category-container'>
      <div className='category-header-container'>
        <h2>Sizes</h2>

        <div className='btn'>
          <button
            className='btn-add'
            onClick={() => {
              setModalOpen(!modalOpen);
              setEditModalOpen(false);
            }}
          >
            Add Size
          </button>
        </div>
      </div>

      {modalOpen && (
        <div className='modal-overlay' onClick={() => setModalOpen(false)}>
          <div className='modal' onClick={(e) => e.stopPropagation()}>
            <div className='close' onClick={() => setModalOpen(false)}>
              x
            </div>
            <h3>Add Sizes</h3>
            <form onSubmit={createCategory}>
              <input
                onChange={(e) => setSize(e.target.value)}
                type='text'
                placeholder='Size name'
                required
              />
            </form>
            <button type='submit' onClick={createCategory}>
              Add Category
            </button>
          </div>
        </div>
      )}

      {editModalOpen && (
        <div className='modal-overlay' onClick={() => setEditModalOpen(false)}>
          <div className='modal' onClick={(e) => e.stopPropagation()}>
            <div className='close' onClick={() => setEditModalOpen(false)}>
              x
            </div>
            <h3>Edit Size</h3>
            <form onSubmit={editCategory}>
              <input
                onChange={(e) => setSize(e.target.value)}
                type='text'
                placeholder='Size name'
                required
              />
              <button type='submit'>Update Size</button>
            </form>
          </div>
        </div>
      )}
      <table id='customers'>
        <thead>
          <tr>
            <th>№</th>
            <th>Sizes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.size}</td>
              <td>
                <button
                  className='btn-edit'
                  onClick={() => {
                    setClickId(item.id);
                    setModalOpen(false);
                    setEditModalOpen(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className='btn-delete'
                  onClick={() => deleteCategory(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ToastContainer />
    </div>
  );
};

export default Sizes;
