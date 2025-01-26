import { useState, useRef } from 'react'
import './App.css'


// ... existing code ...
const App = () => {
  const [memos, setMemos] = useState([]);
  const [inputTitle, setInputTitle] = useState('');
  const [inputContent, setInputContent] = useState('');
  const [editingId, setEditingId] = useState(null);  // 編集中のメモのインデックス
  
  const titleInputRef = useRef(null);  // 追加：input要素への参照を作成
  
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

  const handleNewMemo = () => {
    setEditingId(null);
    setInputTitle('');
    setInputContent('');
    titleInputRef.current?.focus();  // 追加：タイトル入力欄にフォーカスを移動
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
              className="memo-item"
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
            ref={titleInputRef}  // 追加：参照を設定
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
