import React from 'react'
import { useStoreState } from 'easy-peasy';

const FooterComponent = () => {
  const today = new Date();
  const postCount = useStoreState((state)=>state.postCount);
  return (
    <footer className='Footer' style={{ textAlign: 'center' }}>
      <p> { postCount } : Blog Posts </p>
      <p>Copyright &copy; | { today.getFullYear() } </p>
    </footer>
  )
}

export default FooterComponent