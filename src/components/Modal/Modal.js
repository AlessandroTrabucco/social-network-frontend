import React from 'react';
import { useState } from 'react';
import './Modal.css';

const insertAfter = (newNode, existingNode) => {
  existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
};

const Modal = ({ onAddPost, setModal, post }) => {
  const [title, setTitle] = useState(post ? post.title : '');
  const [content, setContent] = useState(post ? post.content : '');
  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState(post ? post.imageUrl : '');

  return (
    <div className='modalContainer'>
      <div className='backdrop ' onClick={() => setModal(false)}></div>
      <div className='modal'>
        <div>
          <form
            id='form'
            onSubmit={async e => {
              e.preventDefault();
              try {
                let _id;
                if (post) {
                  _id = post._id;
                }

                if (
                  image &&
                  image.type !== 'image/png' &&
                  image.type !== 'image/jpg' &&
                  image.type !== 'image/jpeg'
                ) {
                  const imgInput = document.getElementById('uploadImage');
                  if (!imgInput.classList.contains('inputErr')) {
                    imgInput.classList.add('inputErr');
                    const divError = document.createElement('div');
                    divError.classList.add('errText');
                    const errText = document.createTextNode(
                      'The image type has to be png or jpg or jpeg'
                    );
                    divError.appendChild(errText);
                    insertAfter(divError, imgInput);
                  }
                } else {
                  const imgInput = document.getElementById('uploadImage');
                  imgInput.classList.remove('inputErr');
                  const errText = imgInput.nextSibling;
                  if (errText?.classList.contains('errText')) {
                    errText.remove();
                  }
                }

                if (title.length < 5) {
                  const titleEl = document.getElementById('title');
                  if (!titleEl.classList.contains('inputErr')) {
                    titleEl.classList.add('inputErr');
                    const divError = document.createElement('div');
                    divError.classList.add('errText');
                    const errText = document.createTextNode(
                      'The title has to be a minimum of 5 characters'
                    );
                    divError.appendChild(errText);
                    insertAfter(divError, titleEl);
                  }
                } else {
                  const titleEl = document.getElementById('title');
                  titleEl.classList.remove('inputErr');
                  const errText = titleEl.nextSibling;
                  if (errText?.classList.contains('errText')) {
                    errText.remove();
                  }
                }

                if (content.length < 5) {
                  const contentEl = document.getElementById('content');
                  if (!contentEl.classList.contains('inputErr')) {
                    contentEl.classList.add('inputErr');
                    const divError = document.createElement('div');
                    divError.classList.add('errText');
                    const errText = document.createTextNode(
                      'The content has to be a minimum of 5 characters'
                    );
                    divError.appendChild(errText);
                    insertAfter(divError, contentEl);
                  }
                } else {
                  const contentEl = document.getElementById('content');
                  contentEl.classList.remove('inputErr');
                  const errText = contentEl.nextSibling;
                  if (errText?.classList.contains('errText')) {
                    errText.remove();
                  }
                }

                if (!(title.length < 5 || content.length < 5)) {
                  await onAddPost(
                    e,
                    { title, content, image, _id, imageUrl },
                    Boolean(post)
                  );
                  setModal(false);
                }
              } catch (err) {
                alert('some error occured');
              }
            }}
          >
            <div className='hint'>Title</div>
            <input
              id='title'
              type='text'
              value={title}
              onChange={e => setTitle(e.target.value)}
            />

            <div className='hint'>Image</div>

            <input
              type='file'
              id='uploadImage'
              onChange={e => setImage(e.target.files.item(0))}
            />

            {image ? (
              <img id='img' src={URL.createObjectURL(image)} alt=''></img>
            ) : (
              ''
            )}

            <div className='hint'>Content</div>

            <textarea
              id='content'
              rows='5'
              value={content}
              onChange={e => setContent(e.target.value)}
            ></textarea>

            <div className='btn-container'>
              <button
                className='btn'
                id='cancel'
                onClick={e => {
                  e.preventDefault();
                  setModal(false, null);
                }}
              >
                Cancel
              </button>
              <button className='btn' style={{ marginRight: 40, width: 200 }}>
                {post ? 'Edit post' : 'Add post'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Modal;
