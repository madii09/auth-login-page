import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const Colors = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const getCategory = () => {
    fetch('https://back.ifly.com.uz/api/colors')
      .then((res) => res.json())
      .then((item) => setData(item?.data));
  };

  //get api

  useEffect(() => {
    getCategory();
  }, []);

  //post api

  const [colorEn, setColorEn] = useState('');
  const [colorDe, setColorDe] = useState('');
  const [colorRu, setColorRu] = useState('');
  const token = localStorage.getItem('accesstokenn');

  const createCategory = (event) => {
    event.preventDefault();
    fetch('https://back.ifly.com.uz/api/colors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        color_en: colorEn,
        color_ru: colorRu,
        color_de: colorDe,
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
    fetch(`https://back.ifly.com.uz/api/colors/${id}`, {
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
    fetch(`https://back.ifly.com.uz/api/colors/${clickId}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        color_en: colorEn,
        color_ru: colorRu,
        color_de: colorDe,
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
        <h2>Color</h2>

        <div className='btn'>
          <button
            className='btn-add'
            onClick={() => {
              setModalOpen(!modalOpen);
              setEditModalOpen(false);
            }}
          >
            Add Color
          </button>
        </div>
      </div>

      {modalOpen && (
        <div className='modal-overlay' onClick={() => setModalOpen(false)}>
          <div className='modal' onClick={(e) => e.stopPropagation()}>
            <div className='close' onClick={() => setModalOpen(false)}>
              x
            </div>
            <h3>Add Color</h3>
            <form onSubmit={createCategory}>
              <label htmlFor=''>Color (EN)</label>
              <input
                onChange={(e) => setColorEn(e.target.value)}
                type='text'
                placeholder='Color in Eng'
                required
              />
              <label htmlFor=''>Color (RU)</label>
              <input
                onChange={(e) => setColorRu(e.target.value)}
                type='text'
                placeholder='Color in Russian'
                required
              />
              <label htmlFor=''>Color (DE)</label>
              <input
                onChange={(e) => setColorDe(e.target.value)}
                type='text'
                placeholder='Farbe auf Deutsch'
                required
              />
            </form>
            <button type='submit' onClick={createCategory}>
              Add Color
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
            <h3>Edit Color</h3>
            <form onSubmit={editCategory}>
              <input
                onChange={(e) => setColorEn(e.target.value)}
                type='text'
                placeholder='name en'
                required
              />
              <input
                onChange={(e) => setColorRu(e.target.value)}
                type='text'
                placeholder='name ru'
                required
              />
              <input
                onChange={(e) => setColorDe(e.target.value)}
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
            <th>Colors ENG </th>
            <th>Colors RU </th>
            <th>Colors DE </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.color_en}</td>
              <td>{item.color_ru}</td>
              <td>{item.color_de}</td>
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

export default Colors;
