import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const Products = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const getCategory = () => {
    fetch('https://back.ifly.com.uz/api/product?page=1&limit=10&min_sell=2')
      .then((res) => res.json())
      .then((item) => setData(item?.data?.products));
  };

  //get api

  useEffect(() => {
    getCategory();
  }, []);

  //post api

  const [image, setImage] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [colors, setColors] = useState('');
  const [sizes, setSizes] = useState('');
  const [discount, setDiscount] = useState('');
  const [materials, setMaterials] = useState('');
  const token = localStorage.getItem('accesstokenn');

  const createCategory = (event) => {
    event.preventDefault();
    fetch('https://back.ifly.com.uz/api/product?page=1&limit=10&min_sell=2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        images: image,
        title_en: titleEn,
        description_en: descriptionEn,
        price: price,
        category: category,
        colors: colors,
        sizes: sizes,
        discount: discount,
        materials: materials,
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
    fetch(
      `https://back.ifly.com.uz/api/product?page=1&limit=10&min_sell=2/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    )
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
    fetch(
      `https://back.ifly.com.uz/api/product?page=1&limit=10&min_sell=2/${clickId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          images: image,
          title_en: titleEn,
          description_en: descriptionEn,
          price: price,
          category: category,
          colors: colors,
          sizes: sizes,
          discount: discount,
          materials: materials,
        }),
      }
    )
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
        <h2>Products</h2>

        <div className='btn'>
          <button
            className='btn-add'
            onClick={() => {
              setModalOpen(!modalOpen);
              setEditModalOpen(false);
            }}
          >
            Add Product
          </button>
        </div>
      </div>

      {modalOpen && (
        <div className='modal-overlay' onClick={() => setModalOpen(false)}>
          <div className='modal' onClick={(e) => e.stopPropagation()}>
            <div className='close' onClick={() => setModalOpen(false)}>
              x
            </div>
            <h3>Add Product</h3>
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
              <label htmlFor=''>Category Name (EN)</label>
              <input
                onChange={(e) => setDescriptionEn(e.target.value)}
                type='text'
                placeholder='English name'
                required
              />
              <label htmlFor=''>Category Name (EN)</label>
              <input
                onChange={(e) => setPrice(e.target.value)}
                type='text'
                placeholder='English name'
                required
              />
              <label htmlFor=''>Category Name (EN)</label>
              <input
                onChange={(e) => setCategory(e.target.value)}
                type='text'
                placeholder='English name'
                required
              />
              <label htmlFor=''>Category Name (EN)</label>
              <input
                onChange={(e) => setColors(e.target.value)}
                type='text'
                placeholder='English name'
                required
              />
              <label htmlFor=''>Category Name (EN)</label>
              <input
                onChange={(e) => setSizes(e.target.value)}
                type='text'
                placeholder='English name'
                required
              />
              <label htmlFor=''>Category Name (EN)</label>
              <input
                onChange={(e) => setDiscount(e.target.value)}
                type='text'
                placeholder='English name'
                required
              />
              <label htmlFor=''>Category Name (EN)</label>
              <input
                onChange={(e) => setMaterials(e.target.value)}
                type='text'
                placeholder='English name'
                required
              />
            </form>
            <button type='submit' onClick={createCategory}>
              Add Product
            </button>
          </div>
        </div>
      )}

      {editModalOpen && (
        <div className='modal-overlay' onClick={() => setEditModalOpen(false)}>
          <div className='modal' onClick={(e) => e.stopPropagation()}>
            <h3>Edit Category</h3>
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
            <th>Images</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Colors</th>
            <th>Sizes</th>
            <th>Discount</th>
            <th>Materials</th>
          </tr>
        </thead>
        <tbody>
          {data?.products?.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.images?.[0]}</td>
              <td>{item.title_en}</td>
              <td>{item.description_en}</td>
              <td>{item.price}</td>
              <td>{item.category?.name_en}</td>
              <td>{item.colors}</td>
              <td>{item.sizes}</td>
              <td>
                {item.discount ? `${item.discount.discount}%` : 'No discount'}
              </td>
              <td>{item.materials}</td>
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
              <td>
                {item.materials
                  ? Object.entries(item.materials).map(
                      ([materialId, quantity]) => (
                        <div key={materialId}>
                          ID: {materialId}, Qty: {quantity}
                        </div>
                      )
                    )
                  : 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ToastContainer />
    </div>
  );
};
export default Products;
