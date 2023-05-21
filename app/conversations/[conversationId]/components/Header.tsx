import { Conversation, User } from '@prisma/client';
import React from 'react';

type HeaderProps = {
    conversation: Conversation & {
        users: User[]
      }
    
};

const Header:React.FC<HeaderProps> = ({conversation}) => {
    
    return <div>Have a good coding</div>
}
export default Header;