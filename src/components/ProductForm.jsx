import { useState } from "react";

function ProductForm() {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: "",
    description: "",
    email: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (formData.name === "") {
      newErrors.name = "Name is required.";
    }

    if (formData.image === "") {
      newErrors.image = "Image is required.";
    }

    if (formData.price === "") {
      newErrors.price = "Price is required.";
    } else if (Number(formData.price) < 0) {
      newErrors.price = "Price cannot be less than 0.";
    }

    if (formData.description === "") {
      newErrors.description = "Description is required.";
    }

    if (formData.email === "") {
      newErrors.email = "Email is required.";
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(formData.email)) {
        newErrors.email = "Invalid email format.";
      }
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      alert(JSON.stringify(formData, null, 2));
      setFormData({
        name: "",
        image: "",
        price: "",
        description: "",
        email: "",
      });
      setErrors({});
    }
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <h1>Create Product Form</h1>
      <div className="input-container">
        <label>
          Name
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter name here"
            onChange={handleChange}
            value={formData.name}
          />
        </label>
        {errors.name && <p className="error">{errors.name}</p>}
      </div>
      <div className="input-container">
        <label>
          Image Url
          <input
            id="image"
            name="image"
            type="text"
            placeholder="Enter image url here"
            onChange={handleChange}
            value={formData.image}
          />
        </label>
        {errors.image && <p className="error">{errors.image}</p>}
      </div>
      <div className="input-container">
        <label>
          Price
          <input
            id="price"
            name="price"
            type="number"
            placeholder="Enter price here"
            onChange={handleChange}
            value={formData.price}
          />
        </label>
        {errors.price && <p className="error">{errors.price}</p>}
      </div>
      <div className="input-container">
        <label>
          Description
          <textarea
            id="description"
            name="description"
            type="text"
            placeholder="Enter description here"
            onChange={handleChange}
            value={formData.description}
            rows={4}
            cols={30}
          />
        </label>
        {errors.description && <p className="error">{errors.description}</p>}
      </div>
      <div className="input-container">
        <label>
          User's email
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email here"
            onChange={handleChange}
            value={formData.email}
          />
        </label>
        {errors.email && <p className="error">{errors.email}</p>}
      </div>
      <div className="form-actions">
        <button type="submit">Create</button>
      </div>
    </form>
  );
}

export default ProductForm;
