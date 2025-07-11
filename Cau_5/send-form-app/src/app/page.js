'use client'; // Đảm bảo component này là Client Component

import { useState, useEffect } from 'react';

export default function HomePage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState(null); // 'success' | 'error' | null
  const [showToast, setShowToast] = useState(false);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: null,
      }));
    }
    setSubmissionStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Họ và tên không được để trống!';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email không được để trống!';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email không đúng định dạng!';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Nội dung không được để trống!';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmissionStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmissionStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmissionStatus('error');
    }
  };

  useEffect(() => {
    if (submissionStatus) {
      setShowToast(true);
      const timer = setTimeout(() => {
        setShowToast(false);
        setSubmissionStatus(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [submissionStatus]);

  return (
    <div className="container">
      {/* Toast thông báo */}
      {showToast && (
        <div className={`toast ${submissionStatus === 'error' ? 'error' : ''}`}>
          {submissionStatus === 'success'
            ? 'Gửi thành công!'
            : 'Đã xảy ra lỗi khi gửi. Vui lòng thử lại.'}
        </div>
      )}

      <h1>NHẬP THÔNG TIN THEO BIỂU MẪU</h1>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Họ và tên"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>

          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          <div className="form-group">
            <textarea
              id="message"
              name="message"
              placeholder="Nội dung ..."
              value={formData.message}
              onChange={handleChange}
            ></textarea>
            {errors.message && <p className="error-message">{errors.message}</p>}
          </div>

          <button type="submit">SEND</button>
        </form>
      </div>
    </div>
  );
}
