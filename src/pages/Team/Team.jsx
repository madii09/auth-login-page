import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const Team = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const getCategory = () => {
    fetch('https://back.ifly.com.uz/api/team-section')
      .then((res) => res.json())
      .then((item) => setData(item?.data));
  };

  //get api

  useEffect(() => {
    getCategory();
  }, []);

  //post api

  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [positionEn, setPositionEn] = useState('');
  const token = localStorage.getItem('accesstokenn');

  const createCategory = (event) => {
    event.preventDefault();
    fetch('https://back.ifly.com.uz/api/team-section', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        image: image,
        full_name: name,
        position_en: positionEn,
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
    fetch(`https://back.ifly.com.uz/api/team-section/${id}`, {
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
    fetch(`https://back.ifly.com.uz/api/team-section/${clickId}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        image: image,
        full_name: name,
        position_en: positionEn,
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
        <h2>Team Members</h2>

        <div className='btn'>
          <button
            className='btn-add'
            onClick={() => {
              setModalOpen(!modalOpen);
              setEditModalOpen(false);
            }}
          >
            Add Team Member
          </button>
        </div>
      </div>

      {modalOpen && (
        <div className='modal-overlay' onClick={() => setModalOpen(false)}>
          <div className='modal' onClick={(e) => e.stopPropagation()}>
            <div className='close' onClick={() => setModalOpen(false)}>
              x
            </div>
            <h3>Add Team Member</h3>
            <form onSubmit={createCategory}>
              <label htmlFor=''>Full name (EN)</label>
              <input
                onChange={(e) => setImage(e.target.value)}
                type='text'
                placeholder='English name'
                required
              />
              <label htmlFor=''>Position (Eng)</label>
              <input
                onChange={(e) => setName(e.target.value)}
                type='text'
                placeholder='Russian name'
                required
              />
              <label htmlFor=''>Category Name (DE)</label>
              <input
                onChange={(e) => setPositionEn(e.target.value)}
                type='text'
                placeholder='German name'
                required
              />
            </form>
            <button type='submit' onClick={createCategory}>
              Add Team Member
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
            <h3>Edit Category</h3>
            <form onSubmit={editCategory}>
              <input
                onChange={(e) => setImage(e.target.value)}
                type='text'
                placeholder='name en'
                required
              />
              <input
                onChange={(e) => setName(e.target.value)}
                type='text'
                placeholder='name ru'
                required
              />
              <input
                onChange={(e) => setPositionEn(e.target.value)}
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
            <th>Images</th>
            <th>Fullname</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.image}</td>
              <td>{item.full_name}</td>
              <td>{item.position_en}</td>
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

export default Team;
