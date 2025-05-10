import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import './products.scss';

const Products = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const getProduct = () => {
    fetch('https://testaoron.limsa.uz/api/product?page=1&limit=10&min_sell=2')
      .then((res) => res.json())
      .then((item) => {
        console.log(item);
        setData(item.data?.products);
      });
  };

  //get api

  useEffect(() => {
    getProduct();
  }, []);

  console.log(data);

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

    const formData = new FormData();
    formData.append('images', image);
    formData.append('title_en', titleEn);
    formData.append('description_en', descriptionEn);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('colors', colors);
    formData.append('sizes', sizes);
    formData.append('discount', discount);
    formData.append('materials', materials);

    fetch('https://testaoron.limsa.uz/api/product?page=1&limit=10&min_sell=2', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((item) => {
        if (item?.success) {
          toast.success('Product added successfully');
          getProduct();
          setModalOpen(false);
        } else {
          toast.error('Failed to add product');
        }
      });
  };

  // const createCategory = (event) => {
  //   event.preventDefault();
  //   fetch('https://testaoron.limsa.uz/api/product?page=1&limit=10&min_sell=2', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Accept: 'application/json',
  //       Authorization: `Bearer ${token}`,
  //     },
  //     body: JSON.stringify({
  //       images: image,
  //       title_en: titleEn,
  //       description_en: descriptionEn,
  //       price: price,
  //       category: category,
  //       colors: colors,
  //       sizes: sizes,
  //       discount: discount,
  //       materials: materials,
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((item) => {
  //       if (item?.success) {
  //         toast.success('Successful');
  //         getProduct();
  //         setModalOpen(false);
  //       } else {
  //         toast.error('Failed');
  //       }
  //     });
  // };
  //delete
  const deleteCategory = (id) => {
    fetch(`https://testaoron.limsa.uz/api/product/${id}`, {
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
          getProduct();
        } else {
          toast.error(response?.message || 'Failed to delete category.');
        }
      });
  };

  //patch update
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [clickId, setClickId] = useState();
  const editProduct = (e) => {
    e.preventDefault();
    fetch(`https://testaoron.limsa.uz/api/product/${clickId}`, {
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
    })
      .then((res) => res.json())
      .then((item) => {
        if (item?.success) {
          toast.success('Edit Successful');
          getProduct();
          setEditModalOpen(false);
        } else {
          toast.error('Edit Failed');
        }
      });
  };

  const getMaterials = (item) => {
    if (!item) {
      return 'N/A';
    }

    if (Array.isArray(item)) {
      return item.map((i) => {
        if (typeof i === 'object' && i !== null) {
          return getMaterials(i);
        }
        return i;
      });
    }

    if (typeof item === 'object' && item !== null) {
      const obj = Object.values(item).filter((i) => Boolean(i) && i);
      console.log(obj);
      return obj.length > 0 ? obj.join(', ') : 'N/A';
    }
  };

  return (
    <div className='product-container'>
      <div className='product-header-container'>
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
            {/* <div className='close' onClick={() => setEditModalOpen(false)}>
              x
            </div> */}
            <h3>Add Product</h3>
            <form onSubmit={createCategory}>
              <label htmlFor=''>Title (EN)</label>
              <input
                onChange={(e) => setImage(e.target.value)}
                type='text'
                placeholder='English name'
                required
              />

              <label htmlFor=''>Price</label>
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
              <label htmlFor=''>Category</label>
              <input
                onChange={(e) => setSizes(e.target.value)}
                type='text'
                placeholder='English name'
                required
              />
              <label htmlFor=''>Color</label>
              <input
                onChange={(e) => setDiscount(e.target.value)}
                type='text'
                placeholder='English name'
                required
              />
              <label htmlFor=''>Size</label>
              <input
                onChange={(e) => setMaterials(e.target.value)}
                type='text'
                placeholder='English name'
                required
              />
              <label htmlFor=''>Product Image</label>
              <input
                type='file'
                accept='image/*'
                onChange={(e) => setImage(e.target.files[0])}
                required
              />
              {image && (
                <img
                  src={URL.createObjectURL(image)}
                  alt='preview'
                  style={{ width: '100px', marginTop: '10px' }}
                />
              )}
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
            <div className='close' onClick={() => setEditModalOpen(false)}>
              x
            </div>
            <h3>Edit Category</h3>
            <form onSubmit={editProduct}>
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
          {data.length === 0 ? (
            <h2>Loading...</h2>
          ) : (
            data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td className='border border-gray-300 p-2 cursor-pointer w-[150px] h-[100px]'>
                  <img
                    src={`https://testaoron.limsa.uz/${item?.images?.[0]}`}
                    className='w-full h-full rounded-sm'
                    alt='img'
                  />
                </td>
                <td>{item.title_en}</td>
                <td>{item.description_en}</td>
                <td>{item.price}</td>
                <td>{item.category.name_en}</td>
                <td>{item.colors.name_en}</td>
                <td>{item.sizes.map((s) => s.size).join(', ')}</td>
                <td>
                  {item.discount ? `${item.discount.discount}%` : 'No discount'}
                </td>
                <td>{getMaterials(item.materials)}</td>
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
            ))
          )}
        </tbody>
      </table>

      <ToastContainer />
    </div>
  );
};
export default Products;
