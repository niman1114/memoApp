import { useState, useRef } from 'react'
import './App.css'


// ... existing code ...
const App = () => {
  const [memos, setMemos] = useState([]);
  const [inputTitle, setInputTitle] = useState('');
  const [inputContent, setInputContent] = useState('');
  const [editingId, setEditingId] = useState(null);  // 編集中のメモのインデックス
  
  const titleInputRef = useRef(null);  // 追加：input要素への参照
  const memoInputRef = useRef(null);  // 追加：memo-input div への参照
  
  const handleAddMemo = () => {
    if (!inputTitle.trim() && !inputContent.trim()) return;
    setMemos([
      ...memos, 
      { 
        title: inputTitle, 
        content: inputContent,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]);
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
    updatedMemos[editingId] = { 
      ...updatedMemos[editingId],
      title: inputTitle, 
      content: inputContent,
      updatedAt: new Date().toISOString()
    };
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

  const handleNewMemo = () => {
    setEditingId(null);
    setInputTitle('');
    setInputContent('');
    titleInputRef.current?.focus();
    
    // スマートフォンでの自動スクロール
    memoInputRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div>
      <div className="app-container">
        <div className="memo-list">
          <button className="new-memo-button" onClick={handleNewMemo}>
            New Memo
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
              <div className="memo-date">
                <small>
                  作成: {new Date(memo.createdAt).toLocaleString('ja-JP')}
                  {memo.updatedAt !== memo.createdAt && 
                    ` / 更新: ${new Date(memo.updatedAt).toLocaleString('ja-JP')}`}
                </small>
              </div>
            </div>
          ))}
        </div>
        <div className="memo-input" ref={memoInputRef}>
          <input 
            ref={titleInputRef}
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
    </div>
  )
}


export default App
