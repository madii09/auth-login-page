import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const Contact = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [phone_number, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [clickId, setClickId] = useState();
  const token = localStorage.getItem('accesstokenn');

  const getCategory = () => {
    fetch('https://testaoron.limsa.uz/api/contact-form')
      .then((res) => res.json())
      .then((item) => setData(item?.data));
  };

  useEffect(() => {
    getCategory();
  }, []);

  const createCategory = (event) => {
    event.preventDefault();
    fetch('https://testaoron.limsa.uz/api/contact-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        phone_number: phone_number,
        email: email,
        address_en: address,
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
    fetch(`https://testaoron.limsa.uz/api/contact-form/${id}`, {
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
    fetch(`https://testaoron.limsa.uz/api/contact-form/${clickId}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        phone_number: phone_number,
        email: email,
        address_en: address,
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
        <h2>Contact</h2>

        <div className='btn'>
          <button
            className='btn-add'
            onClick={() => {
              setModalOpen(!modalOpen);
              setEditModalOpen(false);
            }}
          >
            Add Contact
          </button>
        </div>
      </div>

      {modalOpen && (
        <div className='modal-overlay' onClick={() => setModalOpen(false)}>
          <div className='modal' onClick={(e) => e.stopPropagation()}>
            <div className='close' onClick={() => setModalOpen(false)}>
              x
            </div>
            <h3>Add Contact</h3>
            <form onSubmit={createCategory}>
              <label htmlFor=''>Phone Number</label>
              <input
                onChange={(e) => setPhoneNumber(e.target.value)}
                type='text'
                placeholder='Phone number'
                required
              />
              <label htmlFor=''>Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type='text'
                placeholder='Email'
                required
              />
              <label htmlFor=''>Addres (EN)</label>
              <input
                onChange={(e) => setAddress(e.target.value)}
                type='text'
                placeholder='Adress EN'
                required
              />
              <label htmlFor=''>Addres (RU)</label>
              <input
                onChange={(e) => setAddress(e.target.value)}
                type='text'
                placeholder='Adress RU'
                required
              />
              <label htmlFor=''>Addres (DE)</label>
              <input
                onChange={(e) => setAddress(e.target.value)}
                type='text'
                placeholder='Adress DE'
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
            <h3>Edit Contact</h3>
            <form onSubmit={editCategory}>
              <label htmlFor=''>Phone Number</label>
              <input
                onChange={(e) => setPhoneNumber(e.target.value)}
                type='text'
                placeholder='Phone number'
                required
              />
              <label htmlFor=''>Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type='text'
                placeholder='Email'
                required
              />
              <label htmlFor=''>Addres (EN)</label>
              <input
                onChange={(e) => setAddress(e.target.value)}
                type='text'
                placeholder='Adress EN'
                required
              />
              <label htmlFor=''>Addres (RU)</label>
              <input
                onChange={(e) => setAddress(e.target.value)}
                type='text'
                placeholder='Adress RU'
                required
              />
              <label htmlFor=''>Addres (DE)</label>
              <input
                onChange={(e) => setAddress(e.target.value)}
                type='text'
                placeholder='Adress DE'
                required
              />
              <button type='submit'>Update Contact</button>
            </form>
          </div>
        </div>
      )}

      <table id='customers'>
        <thead>
          <tr>
            <th>№</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Address (EN)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.phone_number}</td>
              <td>{item.email}</td>
              <td>{item.address_en}</td>
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

export default Contact;
