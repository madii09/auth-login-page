import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const News = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const getCategory = () => {
    fetch('https://testaoron.limsa.uz/api/news')
      .then((res) => res.json())
      .then((item) => setData(item?.data));
  };

  //get api

  useEffect(() => {
    getCategory();
  }, []);

  //post api

  const [image, setImage] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const token = localStorage.getItem('accesstokenn');

  const createCategory = (event) => {
    event.preventDefault();
    fetch('https://testaoron.limsa.uz/api/news', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        image: image,
        title_en: titleEn,
        description_en: descriptionEn,
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
  //delete
  const deleteCategory = (id) => {
    fetch(`https://testaoron.limsa.uz/api/news/${id}`, {
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

  //patch update
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [clickId, setClickId] = useState();
  const editCategory = (e) => {
    e.preventDefault();
    fetch(`https://testaoron.limsa.uz/api/news/${clickId}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        image: image,
        title_en: titleEn,
        description_en: descriptionEn,
      }),
    })
      .then((res) => res.json())
      .then((item) => {
        if (item?.success) {
          toast.success('Edit Successful');
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
        <h2>Category</h2>

        <div className='btn'>
          <button
            className='btn-add'
            onClick={() => {
              setModalOpen(!modalOpen);
              setEditModalOpen(false);
            }}
          >
            Add Category
          </button>
        </div>
      </div>

      {modalOpen && (
        <div className='modal-overlay' onClick={() => setModalOpen(false)}>
          <div className='modal' onClick={(e) => e.stopPropagation()}>
            <div className='close' onClick={() => setModalOpen(false)}>
              x
            </div>
            <h3>Add Category</h3>
            <form onSubmit={createCategory}>
              <label htmlFor=''>Category Name (EN)</label>
              <input
                onChange={(e) => setImage(e.target.value)}
                type='text'
                placeholder='English name'
                required
              />
              <label htmlFor=''>Category Name (RU)</label>
              <input
                onChange={(e) => setTitleEn(e.target.value)}
                type='text'
                placeholder='Russian name'
                required
              />
              <label htmlFor=''>Category Name (DE)</label>
              <input
                onChange={(e) => setDescriptionEn(e.target.value)}
                type='text'
                placeholder='German name'
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
            <h3>Edit News</h3>
            <form onSubmit={editCategory}>
              <input
                onChange={(e) => setImage(e.target.value)}
                type='text'
                placeholder='name en'
                required
              />
              <input
                onChange={(e) => setTitleEn(e.target.value)}
                type='text'
                placeholder='name ru'
                required
              />
              <input
                onChange={(e) => setDescriptionEn(e.target.value)}
                type='text'
                placeholder='name de'
                required
              />
              <button type='submit'>Save Changes</button>
            </form>
          </div>
        </div>
      )}

      <table id='customers'>
        <thead>
          <tr>
            <th>№</th>
            <th>Image</th>
            <th>Title Eng</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>
                <img
                  src={`https://testaoron.limsa.uz/${item.image}`}
                  alt='img'
                />
              </td>
              <td>{item.title_en}</td>
              <td>{item.description_en}</td>
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

export default News;
