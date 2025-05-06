import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const Products = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const getCategory = () => {
    fetch('https://back.ifly.com.uz/api/category')
      .then((res) => res.json())
      .then((item) => setData(item?.data));
  };

  //get api

  useEffect(() => {
    getCategory();
  }, []);

  //post api

  const [nameEn, setNameEn] = useState('');
  const [nameDe, setNameDe] = useState('');
  const [nameRu, setNameRu] = useState('');
  const token = localStorage.getItem('accesstokenn');

  const createCategory = (event) => {
    event.preventDefault();
    fetch('https://back.ifly.com.uz/api/category', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name_en: nameEn,
        name_ru: nameRu,
        name_de: nameDe,
      }),
    })
      .then((response) => response.json())
      .then((item) => {
        if (item?.success) {
          toast.success('Successful');
          // getCategory();
          setModalOpen(false);
        } else {
          toast.error('Failed');
        }
      });
  };
  //delete
  const deleteCategory = (id) => {
    fetch(`https://back.ifly.com.uz/api/category/${id}`, {
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
    // .catch(() => toast.error('Error deleting category.'));
  };

  //patch update
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [clickId, setClickId] = useState();
  const editCategory = (e) => {
    e.preventDefault();
    fetch(`https://back.ifly.com.uz/api/category/${clickId}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name_en: nameEn,
        name_ru: nameRu,
        name_de: nameDe,
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
    <div>
      <h2>Category Page</h2>
      <div className='btn'>
        <button
          onClick={() => {
            setModalOpen(!modalOpen);
            setEditModalOpen(false);
          }}
        >
          Add
        </button>
      </div>
      {modalOpen && (
        <form onSubmit={createCategory}>
          <input
            onChange={(e) => setNameEn(e.target.value)}
            type='text'
            placeholder='name en'
          />
          <input
            onChange={(e) => setNameRu(e.target.value)}
            type='text'
            placeholder='name ru'
          />
          <input
            onChange={(e) => setNameDe(e.target.value)}
            type='text'
            placeholder='name de'
          />
          <button>Add Category</button>
        </form>
      )}

      {editModalOpen && (
        <form onSubmit={editCategory}>
          <label>Edit modal</label>
          <input
            onChange={(e) => setNameEn(e?.target?.value)}
            type='text'
            required
            placeholder='name en'
            minLength={3}
          />
          <input
            onChange={(e) => setNameRu(e?.target?.value)}
            type='text'
            required
            placeholder='name ru'
            minLength={3}
          />
          <input
            onChange={(e) => setNameDe(e?.target?.value)}
            type='text'
            required
            placeholder='name de'
            minLength={3}
          />
          <button>Edit</button>
        </form>
      )}
      <table id='customers'>
        <tr>
          <th>№ </th>
          <th>Title ENG </th>
          <th>Title RU</th>
          <th>Title DE </th>
          <th>Actions</th>
        </tr>

        {data?.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item?.name_en}</td>
            <td>{item?.name_ru}</td>
            <td>{item?.name_de}</td>
            <td>
              <button
                onClick={() => {
                  setClickId(item?.id);
                  setModalOpen(false);
                  setEditModalOpen(!editModalOpen);
                }}
              >
                Edit
              </button>
              <button onClick={() => deleteCategory(item?.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </table>
      <ToastContainer />
    </div>
  );
};
export default Products;
