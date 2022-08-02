import { notification, Input, Button, Modal, Select } from 'antd';
import { getDocs, doc, addDoc, deleteDoc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { affirmationRef, categoriesRef, db } from '../../Firebase';
import { IAff, ICat } from '../Categories/Categories';
import { ButtonDel, Container, Page } from '../Categories/styles';
import { BoxContainer, Div, Li, LiMain, P, Title, Vertical } from './styles';
import deleteSound from '../../assets/delete.mp3';
import createSound from '../../assets/create.mp3';
import useSound from 'use-sound';
const { Option } = Select;
const Affirmation: React.FC = () => {
  const [playCreate] = useSound(createSound, { volume: 0.1 });
  const [playDelete] = useSound(deleteSound, { volume: 0.15 });
  const [categoriesObj, setCategoriesObj] = useState<ICat[]>();
  const [affirmationsObj, setAffirmationsObj] = useState<IAff[]>();
  const [filteredAffObj, setFilteredAffObj] = useState<IAff[]>();
  const [answerValue, setAnswerValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [visible, setVisible] = useState(false);
  const [visibleBtn, setVisibleBtn] = useState(false);
  const [visibleBtnBottom, setVisibleBtnBottom] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [currentId, setCurrentId] = useState('');
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [currentDescription, setCurrentDescription] = useState('');
  const [keyCategory, setKeyCategory] = useState('');
  const [nameCategory, setNameCategory] = useState('');
  const [affirmationsId, setAffirmationsId] = useState(['']);
  const [selectedKey, setSelectedKey] = useState('');

  useEffect(() => {
    getCategories();
    getAffirmation();
  }, [keyCategory]);

  const getCategories = async () => {
    await getDocs(categoriesRef)
      .then(async (resposne) => {
        const categories = resposne.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }));

        let CategoriesObj: ICat[] = [];
        await categories.forEach((e) => {
          const newArray = {
            id: e.id,
            name: e.data.name,
            affirmations: e.data.affirmations,
          };

          CategoriesObj.push(newArray);
        });
        console.log('CategoriesObj', CategoriesObj);
        await setCategoriesObj(CategoriesObj);
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

  const onDeleteAffirmation = async (e: any) => {
    setVisible(true);
    setCurrentId(e.currentTarget.id);
    setCurrentDescription(e.currentTarget.value);
    setCurrentAnswer(e.currentTarget.name);
  };

  const handleOk = async () => {
    setConfirmLoading(true);

    const docRef = doc(db, 'Affirmation', currentId);
    await deleteDoc(docRef)
      .then(() => console.log('Docuent Deleted'))
      .catch((error) => console.log(error.message));

    await getAffirmation();
    notification.open({
      message: '🧺 Deleted successfully ',
    });
    playDelete();

    await setConfirmLoading(false);
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleChange = async (value: string, e: any) => {
    await setKeyCategory(e.key);
    await setNameCategory(value);

    const affAfterFiltered = await categoriesObj?.filter((aff) => {
      return aff.name === value;
    });

    let AffirmationsId: string[] = [];
    await affAfterFiltered?.map((e) =>
      AffirmationsId.push(...(e.affirmations || ''))
    );
    setAffirmationsId(AffirmationsId);

    const Affirmatoins = affirmationsObj?.filter((aff) => {
      return AffirmationsId.includes(aff.id);
    });
    await setFilteredAffObj(Affirmatoins);
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
    await getCategories();
    await getAffirmation();
    console.log('1', nameCategory, keyCategory);

    await handleChange(nameCategory, { key: keyCategory });

    setVisibleBtnBottom(false);
  };
  return (
    <>
      <BoxContainer
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
                // onClick={onChangeCategory}
                id={e.id}
                type="primary"
                name={e.answer}
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
      </BoxContainer>
      <BoxContainer style={{ height: '0%', paddingTop: 18, paddingBottom: 15 }}>
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
            onChange={handleChange}
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
        {filteredAffObj?.map((affirmation) => (
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
                // onClick={onDeleteCategory}
                id={affirmation.id}
                type="primary"
                name={affirmation.answer}
                target={affirmation.description}
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
          }}
        >
          <Select
            defaultValue="Choose affirmation..."
            style={{
              width: '20%',
              textAlign: 'center',
              fontSize: '20px',
            }}
            onChange={handleChangeAffirmation}
          >
            {affirmationsObj?.map((e) => (
              <Option
                key={e.id}
                style={{
                  textAlign: 'center',
                }}
                value={e.answer}
              >
                {e.answer}
              </Option>
            ))}
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
      </BoxContainer>
      <Modal
        title="Are you sure you want to delete?"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
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
    </>
  );
};

export default Affirmation;
