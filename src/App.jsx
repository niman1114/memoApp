import { useState } from 'react'
import './App.css'


// ... existing code ...
const App = () => {
  const [memos, setMemos] = useState([]);
  const [inputTitle, setInputTitle] = useState('');
  const [inputContent, setInputContent] = useState('');
  const [editingId, setEditingId] = useState(null);  // 編集中のメモのインデックス
  
  const handleAddMemo = () => {
    if (!inputTitle.trim() && !inputContent.trim()) return;
    setMemos([...memos, { title: inputTitle, content: inputContent }]);
    setInputTitle('');
    setInputContent('');
  };

  const handleEditMemo = (index) => {
    const memo = memos[index];
    setInputTitle(memo.title);
    setInputContent(memo.content);
    setEditingId(index);
  };

  const handleUpdateMemo = () => {
    if (!inputTitle.trim() && !inputContent.trim()) return;
    const updatedMemos = [...memos];
    updatedMemos[editingId] = { title: inputTitle, content: inputContent };
    setMemos(updatedMemos);
    setInputTitle('');
    setInputContent('');
    setEditingId(null);
  };

  const handleDeleteMemo = () => {
    if (editingId === null) return;
    const updatedMemos = memos.filter((_, index) => index !== editingId);
    setMemos(updatedMemos);
    setInputTitle('');
    setInputContent('');
    setEditingId(null);
  };

  return (
    <div className="app-container">
      <div className="memo-list">
        <h1>メモアプリ</h1>
        <button 
          onClick={() => {
            setEditingId(null);
            setInputTitle('');
            setInputContent('');
          }}
          className="new-memo-button"
        >
          新規登録
        </button>
        {memos.map((memo, index) => (
          <div 
            key={index} 
            className={`memo-item ${editingId === index ? 'editing' : ''}`}
            onClick={() => handleEditMemo(index)}
            style={{ cursor: 'pointer' }}
          >
            <h3>{memo.title}</h3>
            <p>{memo.content}</p>
          </div>
        ))}
      </div>
      <div className="memo-input">
        <input 
          type="text" 
          placeholder="タイトルを入力" 
          value={inputTitle}
          onChange={(e) => setInputTitle(e.target.value)}
        />
        <textarea 
          placeholder="メモを入力" 
          value={inputContent}
          onChange={(e) => setInputContent(e.target.value)}
        />
        <div className="button-group">
          {editingId !== null ? (
            <>
              <button onClick={handleUpdateMemo}>メモを更新</button>
              <button 
                onClick={handleDeleteMemo}
                className="delete-button"
              >
                削除
              </button>
            </>
          ) : (
            <button onClick={handleAddMemo}>メモを追加</button>
          )}
        </div>
      </div>
    </div>
  )
}


export default App
