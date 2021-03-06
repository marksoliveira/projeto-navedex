import React from 'react';
import moment from 'moment';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';

import api from '../../services/api';
import { useUserIssues } from '../../providers/userContext';

import * as S from './styles';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import EditSharpIcon from '@material-ui/icons/EditSharp';

const NaveModal = ({ item, displayModal, displayModalDeleteNave }) => {
    const { setUser } = useUserIssues();
    const history = useHistory()

    const yearsInTheCompany = moment().diff(item.admission_date, 'years');
    const monthsInTheCompany = moment().diff(item.admission_date, 'months');
    const months = monthsInTheCompany % 12;

    const goToEditNavePage = async () => {
        try {
            const config = {
                headers: {
                  Authorization: `Bearer ${window.localStorage.getItem('token')}`,
                },
            };

            const response = await api.get(`/navers/${item.id}`, config);

            setUser(response.data);
            displayModal();
            history.push(`/navers/edit/${item.id}`);
        } catch (error) {
            toast.error("Erro ao carregar usuário naver");
        }
    };

    return (
        <S.Wrapper>
            <S.Container>
                <S.ExitModal onClick={displayModal}>
                    X
                </S.ExitModal>
                <S.NavePhoto>
                    <img src={item.url} alt="Imagem Navers" />
                </S.NavePhoto>
                <S.NaveInfos>
                    <S.Infos>
                        <S.Title>
                            <p>{item.name}</p>
                            <span>{item.job_role}</span>
                        </S.Title>
                        
                        <p>Idade</p> <span>{moment().diff(item.birthdate, 'years')} anos</span>
                        <p>Tempo de empresa</p> <span> {yearsInTheCompany > 0 ?
                                                          yearsInTheCompany + ' ano(s) e ' + months + ' mes(es)' 
                                                        : 
                                                          months + ' mes(es)'
                                                       }
                                                </span>
                        <p>Projetos que participou</p> <span>{item.project}</span>
                    </S.Infos>
                    <S.Buttons>
                        <DeleteSharpIcon 
                            style={{ 
                                color: '#212121', 
                                marginRight: '.5rem', 
                                cursor: 'pointer'
                            }}
                            onClick={displayModalDeleteNave}
                        />
                        <EditSharpIcon 
                            style={{ 
                                color: '#212121', 
                                cursor: 'pointer' 
                            }} 
                            onClick={goToEditNavePage}
                        />
                    </S.Buttons>
                </S.NaveInfos>
            </S.Container>
        </S.Wrapper>
    );
};

export default NaveModal;
