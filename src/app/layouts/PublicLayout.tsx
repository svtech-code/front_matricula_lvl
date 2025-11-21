import { Outlet, useNavigation } from 'react-router-dom';

const PublicLayout = () => {
  const navigation = useNavigation();
  const isNavigation = navigation.state === 'loading';

  return (
    <div>
      <main>
        <Outlet />
      </main>

      {isNavigation && <div>Cargando...</div>}
    </div>
  );
};

export default PublicLayout;
