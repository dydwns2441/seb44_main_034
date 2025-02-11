import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import DeleteAccountBox from '../deleteaccoutbox/DeleteAccoutBox';
import { COLOR_1 } from '../../common/common';
import { FONT_SIZE_1 } from '../../common/common';
import profileimg from '../../assets/profileimg.svg';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const S = {
  AllContainer: styled.div`
    margin-top: 10px;
    height: 950px;
    width: 90vw;
    @media screen and (min-width: 550px) {
      width: 500px;
    }
  `,

  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 680px;
    width: 90vw;
    border-radius: 20px;
    background-color: #fafafa;
    box-shadow: 1px 1px 3px 1px gray;
    @media screen and (min-width: 550px) {
      width: 500px;
    }
  `,
  ProfileImg: styled.img`
    width: 150px;
    height: 150px;
    border-radius: 100px;
    background-color: #aeaeae;
    @media screen and (min-width: 786px) {
      width: 150px;
    }
  `,
  ProfileImgBox: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80vw;
    height: 200px;
    @media screen and (min-width: 550px) {
      width: 500px;
    }
  `,
  SubMiniBox: styled.div`
    display: flex;
    flex-direction: column;
    align-items: baseline;
    height: 530px;
    width: 80vw;
    margin-top: 10px;
    @media screen and (min-width: 550px) {
      width: 470px;
    }
  `,
  SubTitle: styled.label`
    height: 15px;
    margin-top: 10px;
    margin-bottom: 6px;
    font-size: ${FONT_SIZE_1.normal_1};
    @media screen and (min-width: 550px) {
      width: 470px;
    }
  `,
  InputInformation: styled.p`
    height: 5px;
    width: 250px;
    color: ${COLOR_1.light_red};
    font-size: ${FONT_SIZE_1.small_2};
    @media screen and (min-width: 550px) {
      font-size: ${FONT_SIZE_1.small_3};
    }
  `,
  SubmitInput: styled.input`
    height: 50px;
    width: 80vw;
    border-radius: 15px;
    border: none;
    background-color: ${COLOR_1.green};
    color: black;
    font-size: 15px;
    margin-top: 10px;
    margin-bottom: 10px;
    border: solid 1px #cfcfcf;
    cursor: pointer;

    &:hover {
      background-color: #a4c6a4;
    }
    &:active {
      box-shadow: 0px 0px 1px 5px #e1e1e1;
    }
    @media screen and (min-width: 550px) {
      width: 470px;
    }
  `,
  InputBox: styled.input`
    height: 50px;
    width: 78vw;
    padding: 3px;
    border-radius: 15px;
    border: solid 1.5px ${COLOR_1.dark_sand};
    background-color: ${COLOR_1.white};
    cursor: pointer;

    &:hover {
      background-color: #efefef;
    }
    &:active {
      box-shadow: 0px 0px 1px 5px #e1e1e1;
    }
    @media screen and (min-width: 550px) {
      width: 460px;
    }
  `,
  ExitButton: styled.button`
    height: 50px;
    width: 80vw;
    border-radius: 15px;
    border: none;
    background-color: ${COLOR_1.light_green};
    color: black;
    font-size: 15px;
    font-weight: 900;
    margin-top: 10px;
    margin-bottom: 10px;
    border: solid 1px #cfcfcf;
    cursor: pointer;

    &:hover {
      background-color: #a4c6a4;
    }
    &:active {
      box-shadow: 0px 0px 1px 5px #e1e1e1;
    }
    @media screen and (min-width: 550px) {
      width: 470px;
    }
  `,
  DeleteButton: styled.button`
    width: 60px;
    height: 35px;
    margin-top: 55px;
    margin-left: 17px;
    color: gray;
    background-color: #ffffff;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    &:hover {
      background-color: rgba(49, 114, 220, 0.05);
    }
    &:active {
      box-shadow: 0px 0px 1px 3px #aedcff;
    }
  `,
};
interface FormValue {
  nickName: string;
  password: string;
  passwordConfirm: string;
  image: FileList;
}

const EditUserMyPageBox = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openHandler = () => {
    if (!isOpen) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };
  const [avatarPreview, setAvatarPreview] = useState('');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValue>();
  const image = watch('image');
  useEffect(() => {
    if (image && image.length > 0) {
      const file = image[0];
      setAvatarPreview(URL.createObjectURL(file));
    }
  }, [image]);

  const onSubmit: SubmitHandler<FormValue> = (data) => {
    console.log(data);
    axios
      .post('', {
        data,
      })
      .then((response) => {
        // Handle success.
        console.log('Well done!');
        console.log('User profile', response);
        alert('가입이 완료되었습니디.');
      })
      .catch((error) => {
        // Handle error.
        console.log('An error occurred:', error.response);
      });
  };
  return (
    <S.AllContainer>
      <S.Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <S.SubMiniBox>
            <S.ProfileImgBox>
              {avatarPreview ? (
                <S.ProfileImg src={avatarPreview} />
              ) : (
                <S.ProfileImg src={profileimg} />
              )}

              <input
                id='profileImg'
                type='file'
                accept='image/*'
                {...register('image')}
              />
            </S.ProfileImgBox>
            <S.SubTitle htmlFor='nickName'>닉네임</S.SubTitle>
            <S.InputBox
              id='nickName'
              type='text'
              placeholder='닉네임을 입력하세요'
              {...register('nickName', {
                required: '닉네임은 필수 입력입니다',
                minLength: {
                  value: 2,
                  message: '2자이상 입력바랍니다',
                },
              })}
            ></S.InputBox>
            {errors.nickName ? (
              <S.InputInformation>{errors.nickName.message}</S.InputInformation>
            ) : (
              <S.InputInformation>{null}</S.InputInformation>
            )}
            <S.SubTitle htmlFor='password'>비밀번호 변경</S.SubTitle>
            <S.InputBox
              id='password'
              type='password'
              placeholder='비밀번호를 입력하세요'
              {...register('password', {
                required: '비밀번호는 필수 입력입니다',
                minLength: {
                  value: 8,
                  message: '8자 이상입력바랍니다',
                },
                maxLength: {
                  value: 16,
                  message: '16자 이하로 입력바랍니다',
                },
                pattern: {
                  value: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/,
                  message:
                    '숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요',
                },
              })}
            ></S.InputBox>
            {errors.password ? (
              <S.InputInformation>{errors.password.message}</S.InputInformation>
            ) : (
              <S.InputInformation>{null}</S.InputInformation>
            )}
            <S.SubTitle htmlFor='passwordConfirm'>
              비밀번호 변경 확인
            </S.SubTitle>
            <S.InputBox
              id='passwordConfirm'
              type='password'
              placeholder='비밀번호를 입력하세요'
              {...register('passwordConfirm', {
                required: '비밀번호 확인은 필수 입력입니다.',
                validate: {
                  matchesPreviousPassword: (value) => {
                    const { password } = watch();
                    return (
                      password === value || ' 비밀번호가 일치하지 않습니다.'
                    );
                  },
                },
              })}
            ></S.InputBox>
            {errors.passwordConfirm ? (
              <S.InputInformation>
                {errors.passwordConfirm.message}
              </S.InputInformation>
            ) : (
              <S.InputInformation>{null}</S.InputInformation>
            )}
          </S.SubMiniBox>
          <S.SubmitInput type='submit' value='수정완료' />
        </form>
        <Link to='/usermy'>
          <S.ExitButton>나가기</S.ExitButton>
        </Link>
      </S.Container>
      <S.DeleteButton onClick={openHandler}>탈퇴하기</S.DeleteButton>
      {isOpen ? <DeleteAccountBox /> : ''}
    </S.AllContainer>
  );
};

export default EditUserMyPageBox;
