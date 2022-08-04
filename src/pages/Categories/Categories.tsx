import { Button, Input, notification, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  BoxContainer,
  ButtonDel,
  Circle,
  Container,
  GithubPickers,
  Page,
} from './styles';
import { getDocs, doc, addDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { affirmationRef, categoriesRef, db } from '../../Firebase';
import useSound from 'use-sound';
import deleteSound from '../../assets/delete.mp3';
import createSound from '../../assets/create.mp3';
import { IAff, ICat } from '../../types/types';
import { GithubPicker } from 'react-color';

const Categories: React.FC = () => {
  const [playCreate] = useSound(createSound, { volume: 0.1 });
  const [playDelete] = useSound(deleteSound, { volume: 0.15 });
  const [curentValue, setCurentValue] = useState('');
  const [categoriesObj, setCategoriesObj] = useState<ICat[]>();
  const [nameCategory, setNameCategory] = useState(['']);
  const [affirmationsObj, setAffirmationsObj] = useState<IAff[]>();
  const [affirmationModal, setAffirmationModal] = useState<IAff[]>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isChangeModalVisible, setIsChangeModalVisible] = useState(false);
  const [currentId, setCurrentId] = useState('');
  const [currentName, setCurrentName] = useState('');
  const [currentChengeId, setCurrentChengeId] = useState('');
  const [currentChangeInput, setCurrentChangeInput] = useState('');
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedColorModal, setSelectedColorModal] = useState('');

  const color = ['yellow', 'lightgrey', 'purple'];

  useEffect(() => {
    getCategories();
    getAffirmation();
  }, [currentName, currentId]);

  const getCategories = async () => {
    await getDocs(categoriesRef)
      .then((resposne) => {
        const categories = resposne.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }));

        let CategoriesObj: ICat[] = [];
        let nameOfCat: string[] = [];
        categories.forEach((e) => {
          const newArray = {
            id: e.id,
            name: e.data.name,
            affirmations: e.data.affirmations,
            color: e.data.color,
          };
          nameOfCat.push(e.data.name);
          setNameCategory(nameOfCat);
          CategoriesObj.push(newArray);
        });
        setCategoriesObj(CategoriesObj);
      })
      .catch((error) =>
        notification.error({ message: error.message as string })
      );
  };

  const getAffirmation = () => {
    getDocs(affirmationRef)
      .then((resposne) => {
        const affirmations = resposne.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }));

        let AffirmationsObj: IAff[] = [];
        affirmations.forEach((e) => {
          const newArray = {
            id: e.id,
            answer: e.data.answer,
            description: e.data.description,
          };
          AffirmationsObj.push(newArray);
        });
        setAffirmationsObj(AffirmationsObj);
      })
      .catch((error) =>
        notification.error({ message: error.message as string })
      );
  };

  const onAddCategory = async () => {
    if (!curentValue || !selectedColor) {
      return notification.error({
        message: `Fields "Name" and "Color" are required!`,
      });
    }

    if (nameCategory.includes(curentValue)) {
      return notification.error({
        message: `"${curentValue}" - this category already exists`,
      });
    }
    await addDoc(categoriesRef, { name: curentValue, color: selectedColor })
      .then((res) => console.log('res', res))
      .catch((error) => {
        console.log(error.message);
      });
    await getCategories();
    await setSelectedColor('');
    notification.success({
      message: `Successfully created - "${curentValue}"`,
    });
    setCurentValue('');
    playCreate();
  };

  const onDeleteCategory = async (e: any) => {
    setCurrentId(e.currentTarget.id);
    setCurrentName(e.currentTarget.name);
    let affirmations: string[] = [];

    categoriesObj?.forEach((word) => {
      if (word.id === e.currentTarget.id) {
        affirmations = word.affirmations;
      }
    });

    if (!affirmations || affirmations.length === 0) {
      const docRef = doc(db, 'Categories', e.currentTarget.id);
      await deleteDoc(docRef)
        .then(() => console.log('Docuent Deleted'))
        .catch((error) => console.log(error.message));
      await getCategories();
      notification.success({
        message: '🧺 Deleted successfully ',
      });
      return playDelete();
    }

    if (affirmations) {
      let affAfterFiltered = undefined;
      let affCurrent: string[] = [];
      affirmations.forEach((e) => {
        affCurrent.push(e);
      });
      affAfterFiltered = affirmationsObj?.filter((aff) => {
        return affCurrent.includes(aff.id);
      });
      await setAffirmationModal(affAfterFiltered);
      setIsModalVisible(true);
    }
  };

  const onChangeCategory = async (e: any) => {
    setCurrentChengeId(e.currentTarget.id);
    setCurrentChangeInput(e.currentTarget.name);
    setIsChangeModalVisible(true);
  };

  const handleOk = async () => {
    const docRef = doc(db, 'Categories', currentId);
    deleteDoc(docRef)
      .then(() => console.log('Document Deleted'))
      .catch((error) => console.log(error.message));
    getCategories();
    notification.open({
      message: '🧺 Deleted successfully ',
      description: `${currentName}`,
    });
    await playDelete();
    setIsModalVisible(false);
  };

  const handleChangeOk = async () => {
    await setConfirmLoading(true);
    const docRef = doc(db, 'Categories', currentChengeId);
    await updateDoc(docRef, {
      name: currentChangeInput,
      color: selectedColorModal,
    })
      .then(() => console.log('Docuent Updated'))
      .catch((error) => console.log(error.message));
    await getCategories();
    notification.success({
      message: 'Updated successfully ',
    });
    await setSelectedColor('');
    await setConfirmLoading(false);
    await playCreate();
    await setIsChangeModalVisible(false);
  };

  const handleChangeCancel = () => {
    setIsChangeModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onchange = (e: any) => {
    e.hex === '#ffff00' && setSelectedColor('yellow');
    e.hex === '#d3d3d3' && setSelectedColor('grey');
    e.hex === '#800080' && setSelectedColor('purple');
  };

  const onColorModal = (e: any) => {
    e.hex === '#ffff00' && setSelectedColorModal('yellow');
    e.hex === '#d3d3d3' && setSelectedColorModal('grey');
    e.hex === '#800080' && setSelectedColorModal('purple');
  };

  return (
    <>
      <Page style={{ boxShadow: `0 0 10px 3px ${selectedColor || 'none'}` }}>
        <Input
          type="text"
          onChange={(e) => setCurentValue(e.currentTarget.value)}
          value={curentValue}
          placeholder={' New category'}
          style={{ marginRight: 20 }}
        />
        <GithubPickers colors={color} onChange={onchange} />
        <Button
          onClick={onAddCategory}
          type="primary"
          style={{ marginLeft: 20, marginTop: 3 }}
        >
          Add
        </Button>
      </Page>
      <BoxContainer>
        {categoriesObj?.map((e) => (
          <Container key={e.id} style={{ marginBottom: 15 }}>
            <div
              style={{
                display: 'flex',
              }}
            >
              <Circle
                style={{
                  backgroundColor: e.color,
                  boxShadow: `0px 0 12px 10px ${e.color}`,
                }}
              />
              <p
                style={{
                  fontSize: 16,
                  fontWeight: 500,
                  margin: 0,
                  marginLeft: 15,
                }}
              >
                {e.name}
              </p>
            </div>
            <li key={e.id} style={{ display: 'flex' }}>
              <ButtonDel
                onClick={onChangeCategory}
                id={e.id}
                type="primary"
                name={e.name}
                style={{ marginBottom: 0 }}
              >
                ✏
              </ButtonDel>
              <ButtonDel
                onClick={onDeleteCategory}
                id={e.id}
                type="primary"
                name={e.name}
                style={{ marginLeft: 10, marginBottom: 0, marginRight: 8 }}
              >
                ❌
              </ButtonDel>
            </li>
          </Container>
        ))}
      </BoxContainer>
      <Modal
        title="Сategory name change"
        visible={isChangeModalVisible}
        onOk={handleChangeOk}
        onCancel={handleChangeCancel}
        confirmLoading={confirmLoading}
        centered
      >
        <Input
          type="text"
          style={{ marginBottom: 10 }}
          onChange={(e) => setCurrentChangeInput(e.currentTarget.value)}
          value={currentChangeInput}
        />
        <GithubPickers colors={color} onChange={onColorModal} />
      </Modal>

      <Modal
        title="This category has Affirmation(s)! Do you want to delete all?"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {affirmationModal?.map((e) => (
          <ul key={e.id} style={{ paddingLeft: 0 }}>
            <li
              key={e.id}
              style={{
                listStyleType: 'none',
                borderBottom: '1px solid grey',
                marginTop: 5,
              }}
            >
              <p style={{ marginBottom: 0 }}>
                {' '}
                <span style={{ fontWeight: '500' }}>Answer</span> - "{e.answer}"
              </p>
              <p style={{ marginBottom: 5 }}>
                {' '}
                <span style={{ fontWeight: '500' }}>Description</span> - "
                {e.description}"
              </p>
            </li>
          </ul>
        ))}
      </Modal>
    </>
  );
};

export default Categories;
