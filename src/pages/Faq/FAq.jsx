import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const FAq = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const getCategory = () => {
    fetch('https://back.ifly.com.uz/api/faq')
      .then((res) => res.json())
      .then((item) => setData(item?.data));
  };

  //get api

  useEffect(() => {
    getCategory();
  }, []);

  //post api

  const [questionEn, setQuestionEn] = useState('');
  const [answerEn, setAnswerEn] = useState('');
  const token = localStorage.getItem('accesstokenn');

  const createCategory = (event) => {
    event.preventDefault();
    fetch('https://back.ifly.com.uz/api/faq', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        question_en: questionEn,
        answer_en: answerEn,
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
    fetch(`https://back.ifly.com.uz/api/faq/${id}`, {
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
    fetch(`https://back.ifly.com.uz/api/faq/${clickId}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        question_en: questionEn,
        answer_en: answerEn,
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
        <h2> FAQ</h2>

        <div className='btn'>
          <button
            className='btn-add'
            onClick={() => {
              setModalOpen(!modalOpen);
              setEditModalOpen(false);
            }}
          >
            Add FAQ
          </button>
        </div>
      </div>

      {modalOpen && (
        <div className='modal-overlay' onClick={() => setModalOpen(false)}>
          <div className='modal' onClick={(e) => e.stopPropagation()}>
            <div className='close' onClick={() => setModalOpen(false)}>
              x
            </div>
            <h3>Add FAQ</h3>
            <form onSubmit={createCategory}>
              <label htmlFor=''>Question (EN)</label>
              <input
                onChange={(e) => setQuestionEn(e.target.value)}
                type='text'
                placeholder='English name'
                required
              />
              <label htmlFor=''>Answer (EN)</label>
              <input
                onChange={(e) => setQuestionEn(e.target.value)}
                type='text'
                placeholder='English name'
                required
              />
              <label htmlFor=''>Question (RU)</label>
              <input
                onChange={(e) => setAnswerEn(e.target.value)}
                type='text'
                placeholder='Russian name'
                required
              />
              <label htmlFor=''>Answer (RU)</label>
              <input
                onChange={(e) => setAnswerEn(e.target.value)}
                type='text'
                placeholder='Russian name'
                required
              />
              <label htmlFor=''>Question (German)</label>
              <input
                onChange={(e) => setAnswerEn(e.target.value)}
                type='text'
                placeholder='Russian name'
                required
              />
              <label htmlFor=''>Answer (German)</label>
              <input
                onChange={(e) => setAnswerEn(e.target.value)}
                type='text'
                placeholder='Russian name'
                required
              />
            </form>
            <button type='submit' onClick={createCategory}>
              Add FAQ
            </button>
          </div>
        </div>
      )}

      {editModalOpen && (
        <div className='modal-overlay' onClick={() => setEditModalOpen(false)}>
          <div className='modal' onClick={(e) => e.stopPropagation()}>
            <h3>Edit FAQ</h3>
            <form onSubmit={editCategory}>
              <input
                onChange={(e) => setQuestionEn(e.target.value)}
                type='text'
                placeholder='name en'
                required
              />
              <input
                onChange={(e) => setAnswerEn(e.target.value)}
                type='text'
                placeholder='name ru'
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
            <th>№</th>
            <th>Question (EN) </th>
            <th>Answer (EN) </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.question_en}</td>
              <td>{item.answer_en}</td>
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

export default FAq;
