import { notification, Input, Button, Modal, Select } from 'antd';
import {
  getDocs,
  doc,
  addDoc,
  deleteDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { affirmationRef, categoriesRef, db } from '../../Firebase';
import { ButtonDel, Container, Page } from '../Categories/styles';
import { Box, Div, Empty, Li, LiMain, P, Title, Vertical } from './styles';
import deleteSound from '../../assets/delete.mp3';
import createSound from '../../assets/create.mp3';
import useSound from 'use-sound';
import { IAff, ICat } from '../../types/types';
const { Option } = Select;
const Affirmation: React.FC = () => {
  const [playCreate] = useSound(createSound, { volume: 0.1 });
  const [playDelete] = useSound(deleteSound, { volume: 0.15 });

  const [categoriesObj, setCategoriesObj] = useState<ICat[]>();
  const [affirmationsObj, setAffirmationsObj] = useState<IAff[]>();
  const [filteredAffirmation, setFilteredAffObj] = useState<IAff[]>();
  const [affirmationsId, setAffirmationsId] = useState(['']);
  const [currentId, setCurrentId] = useState('');
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [answerValue, setAnswerValue] = useState('');
  const [currentDescription, setCurrentDescription] = useState('');

  const [visible, setVisible] = useState(false);
  const [visibleBtn, setVisibleBtn] = useState(false);
  const [visibleBtnBottom, setVisibleBtnBottom] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [visibleByEdit, setVisibleByEdit] = useState(false);

  const [keyCategory, setKeyCategory] = useState('');
  const [nameCategory, setNameCategory] = useState('');
  const [selectedKey, setSelectedKey] = useState('');

  const [editAnswerValue, setEditAnswerValue] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editId, setEditId] = useState('');

  useEffect(() => {
    getCategories();
    getAffirmation();
  }, [keyCategory, nameCategory]);

  const getCategories = async () => {
    await getDocs(categoriesRef)
      .then(async (resposne) => {
        const categories = resposne.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }));

        let categoriesObj: ICat[] = [];
        categories.forEach((e) => {
          const newArray = {
            id: e.id,
            name: e.data.name,
            affirmations: e.data.affirmations,
          };

          categoriesObj.push(newArray);
        });

        const affAfterFiltered = categoriesObj?.filter((aff) => {
          return aff.name === nameCategory;
        });

        let AffirmationsId: string[] = [];
        affAfterFiltered?.map((e) =>
          AffirmationsId.push(...(e.affirmations || ''))
        );

        setAffirmationsId(AffirmationsId);
        const Affirmatoins = affirmationsObj?.filter((aff) => {
          return AffirmationsId?.includes(aff.id);
        });

        setFilteredAffObj(Affirmatoins);

        setCategoriesObj(categoriesObj);
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

  const onAddAffirmation = async () => {
    if (!answerValue || !descriptionValue) {
      return notification.error({
        message: 'Two fields are required!',
        description: '"New Answer" and "New Affirmation" are required!',
      });
    }
    setVisibleBtn(true);
    await addDoc(affirmationRef, {
      answer: answerValue,
      description: descriptionValue,
    })
      .then((res) => console.log('res', res))
      .catch((error) => {
        console.log(error.message);
      });
    await getAffirmation();

    notification.success({
      message: `${answerValue}`,
      description: `${descriptionValue}`,
    });
    setAnswerValue('');
    setDescriptionValue('');
    playCreate();
    setVisibleBtn(false);
  };

  const onDeleteAffirmation = async (e: React.MouseEvent<HTMLInputElement>) => {
    const containInCategory = categoriesObj?.filter((cat) =>
      cat.affirmations?.includes(e.currentTarget.id)
    );

    const name = containInCategory?.map((e) => e.name);
    if (!containInCategory || containInCategory.length !== 0) {
      return notification.error({
        message: 'Deletion prohibited!',
        description: `First you need to remove from the category(ies) - "${name}"`,
      });
    }

    setCurrentId(e.currentTarget.id);
    setCurrentDescription(e.currentTarget.value);
    setCurrentAnswer(e.currentTarget.name);
    await setVisible(true);
  };

  const onDeleteAffirmationModal = async () => {
    setConfirmLoading(true);

    const docRef = doc(db, 'Affirmation', currentId);
    await deleteDoc(docRef)
      .then(() => console.log('Docuent Deleted'))
      .catch((error) => console.log(error.message));

    await getAffirmation();
    notification.success({
      message: '🧺 Deleted successfully ',
    });
    playDelete();

    await setConfirmLoading(false);
    setVisible(false);
  };

  const fetchSelectedAffirmations = async (nameCategory: string, e: any) => {
    setKeyCategory(e.key);
    setNameCategory(nameCategory);
    await getCategories();
  };

  const handleChangeAffirmation = async (value: string, e: any) => {
    setSelectedKey(e.key);
  };

  const onUpdateAffirmation = async () => {
    setVisibleBtnBottom(true);

    const docRef = doc(db, 'Categories', keyCategory);
    await setDoc(docRef, {
      affirmations: [...affirmationsId, selectedKey],
      name: nameCategory,
    })
      .then((res) => console.log('res', res))
      .catch((error) => {
        console.log(error.message);
      });
    await fetchSelectedAffirmations(nameCategory, { key: keyCategory });
    setVisibleBtnBottom(false);
    notification.success({
      message: `Successful update `,
      description: `Category "${nameCategory}"`,
    });
    playCreate();
  };

  const onSeparateAffirmation = async (
    e: React.MouseEvent<HTMLInputElement>
  ) => {
    const id = e.currentTarget.id;
    const affirmationArrayAfterDelete = affirmationsId.filter((e) => e !== id);
    const docRef = doc(db, 'Categories', keyCategory);
    await setDoc(docRef, {
      affirmations: [...affirmationArrayAfterDelete],
      name: nameCategory,
    })
      .then((res) => console.log('res', res))
      .catch((error) => {
        console.log(error.message);
      });
    getCategories();
    notification.success({
      message: `🧺 Deleted successfully`,
    });
    playDelete();
  };

  const renderAffirmations = (affirmations: IAff[] | undefined) => {
    return affirmations?.map((e) => (
      <Option
        key={e.id}
        style={{
          textAlign: 'center',
        }}
        value={e.answer}
      >
        {e.answer}
      </Option>
    ));
  };

  const onEditAffirmation = async (e: React.MouseEvent<HTMLInputElement>) => {
    setVisibleByEdit(true);
    setEditId(e.currentTarget.id);
    setEditAnswerValue(JSON.parse(e.currentTarget.name)[0]);
    setEditDescription(JSON.parse(e.currentTarget.name)[1]);
  };

  const onOkEditModal = async () => {
    const docRef = doc(db, 'Affirmation', editId);
    await updateDoc(docRef, {
      answer: editAnswerValue,
      description: editDescription,
    })
      .then(() => console.log('Docuent Updated'))
      .catch((error) => console.log(error.message));
    await getAffirmation();
    notification.success({
      message: 'Updated successfully ',
    });
    await setConfirmLoading(false);
    await playCreate();
    await setVisibleByEdit(false);
  };

  return (
    <>
      <Box
        style={{
          height: '0%',
          paddingTop: 18,
          paddingBottom: 15,
          marginTop: 5,
        }}
      >
        <Title>Add new Affirmation</Title>
        <Page style={{ marginBottom: 10, maxWidth: '100%' }}>
          <Input
            type="text"
            onChange={(e) => setAnswerValue(e.currentTarget.value)}
            value={answerValue}
            placeholder={' New Answer'}
          />
          <Input
            type="text"
            onChange={(e) => setDescriptionValue(e.currentTarget.value)}
            value={descriptionValue}
            placeholder={' New Description'}
            style={{ marginLeft: 20 }}
          />
          <Button
            onClick={onAddAffirmation}
            type="primary"
            style={{ marginLeft: 20 }}
            loading={visibleBtn}
          >
            Add
          </Button>
        </Page>
        <LiMain>
          <Div>
            <P style={{ fontSize: 18, fontWeight: 500 }}>Answer</P>
          </Div>
          <Div>
            <P style={{ fontSize: 18, fontWeight: 500 }}>Description</P>
          </Div>
        </LiMain>
        {affirmationsObj?.map((e) => (
          <Container key={e.id} style={{ borderBottom: 'none' }}>
            <Li>
              <Div>
                <P style={{ fontSize: 16, fontWeight: 300 }}>{e.answer}</P>
              </Div>
              <Vertical />
              <Div>
                <P style={{ fontSize: 16, fontWeight: 300 }}>{e.description}</P>
              </Div>
            </Li>
            <li key={e.id} style={{ display: 'flex', alignItems: 'center' }}>
              <ButtonDel
                onClick={onEditAffirmation}
                id={e.id}
                type="primary"
                name={JSON.stringify([e.answer, e.description])}
                style={{ marginBottom: 0 }}
              >
                ✏
              </ButtonDel>
              <ButtonDel
                onClick={onDeleteAffirmation}
                id={e.id}
                type="primary"
                name={e.answer}
                value={e.description}
                style={{ marginLeft: 10, marginBottom: 0 }}
              >
                ❌
              </ButtonDel>
            </li>
          </Container>
        ))}
      </Box>
      <Box style={{ height: '0%', paddingTop: 18, paddingBottom: 15 }}>
        <Title>Add Affirmations to Category</Title>
        <LiMain>
          <Select
            defaultValue="Choose category..."
            style={{
              width: '50%',
              marginLeft: 'auto',
              marginRight: 'auto',
              textAlign: 'center',
              fontSize: '20px',
            }}
            onChange={fetchSelectedAffirmations}
          >
            {categoriesObj?.map((e) => (
              <Option
                key={e.id}
                style={{
                  textAlign: 'center',
                }}
                value={e.name}
              >
                {e.name}
              </Option>
            ))}
          </Select>
        </LiMain>
        {!filteredAffirmation?.length && (
          <Container style={{ borderBottom: 'none' }}>
            <Empty>Empty list</Empty>
          </Container>
        )}
        {filteredAffirmation?.map((affirmation) => (
          <Container key={affirmation.id} style={{ borderBottom: 'none' }}>
            <Li>
              <Div>
                <P style={{ fontSize: 16, fontWeight: 300 }}>
                  {affirmation.answer}
                </P>
              </Div>
              <Vertical />
              <Div>
                <P style={{ fontSize: 16, fontWeight: 300 }}>
                  {affirmation.description}
                </P>
              </Div>
            </Li>
            <li
              key={affirmation.id}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <ButtonDel
                id={affirmation.id}
                type="primary"
                name={affirmation.answer}
                onClick={onSeparateAffirmation}
                style={{ marginLeft: 10, marginBottom: 0 }}
              >
                ❌
              </ButtonDel>
            </li>
          </Container>
        ))}

        <LiMain
          style={{
            justifyContent: 'center',
            marginTop: 10,
          }}
        >
          <Select
            defaultValue="Choose affirmation..."
            style={{
              width: '30%',
              textAlign: 'center',
              fontSize: '16px',
              marginLeft: 40,
            }}
            onChange={handleChangeAffirmation}
          >
            {renderAffirmations(affirmationsObj)}
          </Select>
          <Button
            onClick={onUpdateAffirmation}
            type="primary"
            style={{ marginLeft: 20 }}
            loading={visibleBtnBottom}
          >
            Add
          </Button>
        </LiMain>
      </Box>
      <Modal
        title="Are you sure you want to delete?"
        visible={visible}
        onOk={onDeleteAffirmationModal}
        onCancel={(): void => setVisible(false)}
        confirmLoading={confirmLoading}
        centered
      >
        <p style={{ marginBottom: 0 }}>
          {' '}
          <span style={{ fontWeight: '500' }}>Answer</span> - "{currentAnswer}"
        </p>
        <p style={{ marginBottom: 5 }}>
          {' '}
          <span style={{ fontWeight: '500' }}>Description</span> - "
          {currentDescription}"
        </p>
      </Modal>
      <Modal
        title="Affirmation editing!"
        visible={visibleByEdit}
        onOk={onOkEditModal}
        onCancel={(): void => setVisibleByEdit(false)}
        confirmLoading={confirmLoading}
        centered
      >
        <p style={{ marginBottom: 0 }}>
          {' '}
          <span style={{ fontWeight: '500' }}>Answer</span>
        </p>
        <Input
          type="text"
          onChange={(e) => setEditAnswerValue(e.currentTarget.value)}
          value={editAnswerValue}
        />
        <p style={{ marginBottom: 5, marginTop: 10 }}>
          {' '}
          <span style={{ fontWeight: '500' }}>Description</span>
        </p>
        <Input
          type="text"
          onChange={(e) => setEditDescription(e.currentTarget.value)}
          value={editDescription}
        />
      </Modal>
    </>
  );
};

export default Affirmation;
