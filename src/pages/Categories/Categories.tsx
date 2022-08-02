import { Button, Input, notification, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { BoxContainer, ButtonDel, Container, Page } from './styles';
import { getDocs, doc, addDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { affirmationRef, categoriesRef, db } from '../../Firebase';
import useSound from 'use-sound';
import deleteSound from '../../assets/delete.mp3';
import createSound from '../../assets/create.mp3';
import { IAff, ICat } from '../../types/types';

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
    if (!curentValue) {
      return;
    }

    if (nameCategory.includes(curentValue)) {
      return notification.error({
        message: `"${curentValue}" - this category already exists`,
      });
    }
    await addDoc(categoriesRef, { name: curentValue })
      .then((res) => console.log('res', res))
      .catch((error) => {
        console.log(error.message);
      });
    await getCategories();

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
    if (!affirmations) {
      const docRef = doc(db, 'Categories', e.currentTarget.id);
      await deleteDoc(docRef)
        .then(() => console.log('Docuent Deleted'))
        .catch((error) => console.log(error.message));
      await getCategories();
      notification.success({
        message: '🧺 Deleted successfully ',
      });
      playDelete();
    }

    if (affirmations) {
      console.log('da');
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
    await updateDoc(docRef, { name: currentChangeInput })
      .then(() => console.log('Docuent Updated'))
      .catch((error) => console.log(error.message));
    await getCategories();
    notification.success({
      message: 'Updated successfully ',
    });
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

  return (
    <>
      <Page>
        <Input
          type="text"
          onChange={(e) => setCurentValue(e.currentTarget.value)}
          value={curentValue}
          placeholder={' New category'}
        />
        <Button
          onClick={onAddCategory}
          type="primary"
          style={{ marginLeft: 20 }}
        >
          Add
        </Button>
      </Page>
      <BoxContainer>
        {categoriesObj?.map((e) => (
          <Container key={e.id}>
            <p style={{ fontSize: 16, fontWeight: 500 }}>{e.name}</p>
            <li key={e.id} style={{ display: 'flex' }}>
              <ButtonDel
                onClick={onChangeCategory}
                id={e.id}
                type="primary"
                name={e.name}
              >
                ✏
              </ButtonDel>
              <ButtonDel
                onClick={onDeleteCategory}
                id={e.id}
                type="primary"
                name={e.name}
                style={{ marginLeft: 10 }}
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
          onChange={(e) => setCurrentChangeInput(e.currentTarget.value)}
          value={currentChangeInput}
        />
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
