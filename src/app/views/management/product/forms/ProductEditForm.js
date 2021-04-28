import React, {useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {Form, Button} from 'react-bootstrap';
import ClassicEditor  from '@ckeditor/ckeditor5-build-classic';
import {CKEditor} from '@ckeditor/ckeditor5-react'
import _ from 'lodash';

function ProductEditForm({product, handleSubmitForm, error}) {
  const location = useLocation();
  const {register, errors, handleSubmit, setError, setValue} = useForm();

  useEffect(() => {
    if (!_.isEmpty(error)) {
      setError(error.name, error.value);
    }
  }, [error]);

  const onDescriptionChange = (event, editor) => {
    const data = editor.getData();
    setValue('description', data);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit(handleSubmitForm)}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control placeholder="Enter name"
                        name="name"
                        isInvalid={!!errors.name}
                        ref={
                          register({
                            required: 'Name is required.'
                          })
                        }
                        defaultValue={product.name}/>
          {
            errors.name &&
            <Form.Text className="text-danger">
              {errors.name.message}
            </Form.Text>
          }
        </Form.Group>
        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <CKEditor editor={ClassicEditor}
                    data={product.description}
                    config={{
                      height: 500,
                      toolbar: [
                        'heading', '|',
                        'bold', 'italic', '|',
                        'link', '|',
                        'outdent', 'indent', '|',
                        'bulletedList', 'numberedList', '|',
                        'undo', 'redo'
                      ],
                    }}
                    onReady={editor => {}}
                    onChange={onDescriptionChange}/>
          <Form.Control as="textarea"
                        name="description"
                        isInvalid={!!errors.description}
                        ref={register()}
                        defaultValue={product.description}
                        style={{display: 'none'}}/>
          {
            errors.description &&
            <Form.Text className="text-danger">
              {errors.description.message}
            </Form.Text>
          }
        </Form.Group>
        <Form.Group controlId="formPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control placeholder="Enter price"
                        name="price"
                        isInvalid={!!errors.price}
                        ref={
                          register({
                            required: 'Price is required.'
                          })
                        }
                        defaultValue={product.price}/>
          {
            errors.price &&
            <Form.Text className="text-danger">
              {errors.price.message}
            </Form.Text>
          }
        </Form.Group>
        <Form.Group controlId="formMemberPrice">
          <Form.Label>Member Price</Form.Label>
          <Form.Control placeholder="Enter member price"
                        name="memberPrice"
                        isInvalid={!!errors.memberPrice}
                        ref={
                          register({
                            required: 'Member price is required.'
                          })
                        }
                        defaultValue={product.memberPrice}/>
          {
            errors.memberPrice &&
            <Form.Text className="text-danger">
              {errors.memberPrice.message}
            </Form.Text>
          }
        </Form.Group>
        <div className="text-right">
          <Button type="submit" className="mr-2" variant="secondary">
            Save
          </Button>
          <Button type="button" variant="light"
                  to={{pathname: '/manage/products', state: {from: location.pathname}}} as={Link}>
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default ProductEditForm;