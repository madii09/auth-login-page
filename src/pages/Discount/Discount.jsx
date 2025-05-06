import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import './discount.scss';

const Discount = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const getDiscount = () => {
    fetch('https://back.ifly.com.uz/api/discount')
      .then((res) => res.json())
      .then((item) => setData(item?.data));
  };

  //get api

  useEffect(() => {
    getDiscount();
  }, []);

  //post api

  // const [id, setId] = useState('');
  const [discount, setDiscount] = useState('');
  const [createdDate, setCreatedDate] = useState('');
  const [finishedDate, setFinishedDate] = useState('');
  const [status, setStatus] = useState('');
  const token = localStorage.getItem('accesstokenn');

  const createDiscount = (event) => {
    event.preventDefault();
    fetch('https://back.ifly.com.uz/api/discount', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        discount: discount,
        createdAt: createdDate,
        finished_at: finishedDate,
        status: status,
      }),
    })
      .then((response) => response.json())
      .then((item) => {
        if (item?.success) {
          toast.success('Successful');
          getDiscount();
          setModalOpen(false);
        } else {
          toast.error('Failed');
        }
      });
  };
  //delete
  const deleteDiscount = (id) => {
    fetch(`https://back.ifly.com.uz/api/discount/${id}`, {
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
          getDiscount();
        } else {
          toast.error(response?.message || 'Failed to delete category.');
        }
      });
  };

  //patch update
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [clickId, setClickId] = useState();
  const editDiscount = (e) => {
    e.preventDefault();
    fetch(`https://back.ifly.com.uz/api/discount/${clickId}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        discount: discount,
        createdAt: createdDate,
        finished_at: finishedDate,
        status: status,
      }),
    })
      .then((res) => res.json())
      .then((item) => {
        if (item?.success) {
          toast.success('Edit Successful');
          getDiscount();
          setEditModalOpen(false);
        } else {
          toast.error('Edit Failed');
        }
      });
  };

  return (
    <div className='category-container'>
      <div className='category-header-container'>
        <h2>Discount</h2>

        <div className='btn'>
          <button
            className='btn-add'
            onClick={() => {
              setModalOpen(!modalOpen);
              setEditModalOpen(false);
            }}
          >
            Add Discount
          </button>
        </div>
      </div>

      {modalOpen && (
        <div className='modal-overlay' onClick={() => setModalOpen(false)}>
          <div className='modal' onClick={(e) => e.stopPropagation()}>
            <div className='close' onClick={() => setModalOpen(false)}>
              x
            </div>
            <h3>Add Discount</h3>
            <form onSubmit={createDiscount}>
              <label htmlFor=''></label>
              <input
                onChange={(e) => setDiscount(e.target.value)}
                type='text'
                placeholder='Discount (%)'
                required
              />
              <input
                onChange={(e) => setCreatedDate(e.target.value)}
                type='date'
                placeholder='dd/mm/yyyy'
                required
              />
              <input
                onChange={(e) => setFinishedDate(e.target.value)}
                type='date'
                placeholder='dd/mm/yyyy'
                required
              />
              <input
                onChange={(e) => setStatus(e.target.value)}
                type='checkbox'
                placeholder='//'
                required
              />
            </form>
            <button type='submit' onClick={createDiscount}>
              Add Discount
            </button>
          </div>
        </div>
      )}

      {editModalOpen && (
        <div className='modal-overlay' onClick={() => setEditModalOpen(false)}>
          <div className='modal' onClick={(e) => e.stopPropagation()}>
            <h3>Edit Category</h3>
            <form onSubmit={editDiscount}>
              <input
                onChange={(e) => setDiscount(e.target.value)}
                type='text'
                placeholder='name en'
                required
              />
              <input
                onChange={(e) => setCreatedDate(e.target.value)}
                type='text'
                placeholder='name ru'
                required
              />
              <input
                onChange={(e) => setFinishedDate(e.target.value)}
                type='text'
                placeholder='name de'
                required
              />
              <button type='submit'>Save Changes</button>
            </form>
            <button onClick={() => setEditModalOpen(false)}>Close</button>
          </div>
        </div>
      )}

      <table id='customers'>
        <thead>
          <tr>
            <th>№ </th>
            <th>Discount (%) </th>
            <th>Created Date </th>
            <th>Finished Date </th>
            <th>Status </th>
            <th>Actions </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.discount}</td>
              <td>{item.createdAt}</td>
              <td>{item.finished_at}</td>
              <td>{item.status}</td>
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
                  onClick={() => deleteDiscount(item.id)}
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

export default Discount;
