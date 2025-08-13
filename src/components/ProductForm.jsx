import { useState } from "react";

function ProductForm() {
  const [formData,setFormData] = useState({
    name: "",
    image: "",
    price: "",
    description: "",
    email: ""
  })
  const [isValidForm,setValidForm] = useState({
    name: false,
    image: false,
    price: false,
    description: false,
    email: false
  })
  const [formWarning,setWarning] = useState({
    name: "",
    image: "",
    price: "",
    description: "",
    email: ""
  })
  
  const checkForm = (e) => {
    e.preventDefault(); // ป้องกันการ refresh หน้า
    
    // Reset validation state และ warning messages
    setValidForm({
      name: false,
      image: false,
      price: false,
      description: false,
      email: false
    });
    setWarning({
      name: "",
      image: "",
      price: "",
      description: "",
      email: ""
    });
    
    let hasError = false;
    
    if (formData.name.length === 0) {
      setValidForm(prevUser => ({ ...prevUser, name: true}));
      setWarning(prev => ({ ...prev, name: "Name is required." }));
      hasError = true;
    }
    if (formData.image.length === 0) {
      setValidForm(prevUser => ({ ...prevUser, image: true}));
      setWarning(prev => ({ ...prev, image: "Image URL is required." }));
      hasError = true;
    }
    if (formData.price.length === 0) {
      setValidForm(prevUser => ({ ...prevUser, price: true}));
      setWarning(prev => ({ ...prev, price: "Price is required." }));
      hasError = true;
    } else if (formData.price <= 0) {
      setValidForm(prevUser => ({ ...prevUser, price: true}));
      setWarning(prev => ({ ...prev, price: "Price must be greater than 0." }));
      hasError = true;
    }
    if (formData.description.length === 0) {
      setValidForm(prevUser => ({ ...prevUser, description: true}));
      setWarning(prev => ({ ...prev, description: "Description is required." }));
      hasError = true;
    }
    if (formData.email.length === 0) {
      setValidForm(prevUser => ({ ...prevUser, email: true}));
      setWarning(prev => ({ ...prev, email: "Email is required." }));
      hasError = true;
    } else if (!isValidEmailFormat(formData.email)) {
      setValidForm(prevUser => ({ ...prevUser, email: true}));
      setWarning(prev => ({ ...prev, email: "Please enter a valid email format." }));
      hasError = true;
    }
    
    if (!hasError) {
      // ถ้าไม่มี error ให้ submit ฟอร์ม
      console.log("Form submitted successfully:", formData);
      // เพิ่มโค้ดสำหรับส่งข้อมูลไปยัง server หรือทำอย่างอื่นที่นี่
    }
  }
  
  // ฟังก์ชันตรวจสอบรูปแบบอีเมล
  const isValidEmailFormat = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  console.log(formData);

  return (
    <form className="post-form" onSubmit={checkForm}>
      <h1>Create Product Form</h1>
      <div className="input-container">
        <label>
          Name
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter name here"
            value={formData.name}
            onChange={(event) => {setFormData(prevUser => ({ ...prevUser, name: event.target.value }))}}
          />
        </label>
        {isValidForm.name ? <div className="warning-box">{formWarning.name}</div> : null}
      </div>
      <div className="input-container">
        <label>
          Image Url
          <input
            id="image"
            name="image"
            type="text"
            placeholder="Enter image url here"
            value={formData.image}
            onChange={(event) => {setFormData(prevUser => ({ ...prevUser, image: event.target.value }))}}
          />
        </label>
        {isValidForm.image ? <div className="warning-box">{formWarning.image}</div> : null}
      </div>
      <div className="input-container">
        <label>
          Price
          <input
            id="price"
            name="price"
            type="number"
            placeholder="Enter price here"
            value={formData.price}
            onChange={(event) => {setFormData(prevUser => ({ ...prevUser, price: event.target.value }))}}
          />
        </label>
        {isValidForm.price ? <div className="warning-box">{formWarning.price}</div> : null}
      </div>
      <div className="input-container">
        <label>
          Description
          <textarea
            id="description"
            name="description"
            type="text"
            placeholder="Enter description here"
            value={formData.description}
            onChange={(event) => {setFormData(prevUser => ({ ...prevUser, description: event.target.value }))}}
            rows={4}
            cols={30}
          />
        </label>
        {isValidForm.description ? <div className="warning-box">{formWarning.description}</div> : null}
      </div>
      <div className="input-container">
        <label>
          User's email
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email here"
            value={formData.email}
            onChange={(event) => {setFormData(prevUser => ({ ...prevUser, email: event.target.value }))}}
          />
        </label>
        {isValidForm.email ? <div className="warning-box">{formWarning.email}</div> : null}
      </div>
      <div className="form-actions">
        <button type="submit">Create</button>
      </div>
    </form>
  );
}

export default ProductForm;
