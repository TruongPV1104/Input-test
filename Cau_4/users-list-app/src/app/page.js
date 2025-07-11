'use client'
import { useState, useEffect } from 'react'

export default function Home() {
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  return (
    <main className="container">
      {/* Danh sách người dùng */}
      <div className="panel user-list">
        <h2>DANH SÁCH NGƯỜI DÙNG</h2>
        <ul>
          {users.map(user => (
            <li key={user.id} onClick={() => setSelectedUser(user)}>
              {user.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Chi tiết người dùng */}
      <div className="panel user-detail">
        <h2>THÔNG TIN CHI TIẾT</h2>
        {selectedUser ? (
          <div>
            <p><strong>Tên người dùng:</strong> {selectedUser.username}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Điện thoại:</strong> {selectedUser.phone}</p>
            <p><strong>Địa chỉ:</strong> {selectedUser.address.street}, {selectedUser.address.suite}, {selectedUser.address.city}</p>
            <p><strong>Website:</strong> {selectedUser.website}</p>
            <p><strong>Công ty:</strong> {selectedUser.company.name}, {selectedUser.company.catchPhrase}, {selectedUser.company.bs}</p>
          </div>
        ) : (
          <p className='hd'>Chọn một người dùng từ danh sách bên trái để xem chi tiết.</p>
        )}
      </div>
    </main>
  )
}
