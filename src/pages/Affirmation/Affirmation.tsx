import { notification, Input, Button } from 'antd';
import { getDocs, doc, addDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { affirmationRef, categoriesRef } from '../../Firebase';
import { IAff, ICat } from '../Categories/Categories';
import { BoxContainer, ButtonDel, Container, Page } from '../Categories/styles';
import { Div, Li, LiMain, P, Vertical } from './styles';

const Affirmation: React.FC = () => {
  const [categoriesObj, setCategoriesObj] = useState<ICat[]>();
  const [affirmationsObj, setAffirmationsObj] = useState<IAff[]>();

  useEffect(() => {
    getCategories();
    getAffirmation();
  }, []);

  const getCategories = () => {
    getDocs(categoriesRef)
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

  return (
    <>
      <Page>
        <Input
          type="text"
          // onChange={(e) => setCurentValue(e.currentTarget.value)}
          // value={curentValue}
          placeholder={' New Affirmation'}
        />
        <Button
          // onClick={onAddCategory}
          type="primary"
          style={{ marginLeft: 20 }}
        >
          Add
        </Button>
      </Page>
      <BoxContainer style={{ height: '0%', paddingTop: 8, paddingBottom: 15 }}>
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
                // onClick={onDeleteCategory}
                id={e.id}
                type="primary"
                name={e.answer}
                style={{ marginLeft: 10, marginBottom: 0 }}
              >
                ❌
              </ButtonDel>
            </li>
          </Container>
        ))}
      </BoxContainer>
    </>
  );
};

export default Affirmation;
