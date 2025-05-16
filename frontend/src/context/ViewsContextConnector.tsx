import { ReactNode } from 'react';
import { useVideos } from './VideoContext';
import { ViewsProvider } from './ViewsContext';

interface ViewsContextConnectorProps {
  children: ReactNode;
}

export function ViewsContextConnector({ children }: ViewsContextConnectorProps) {
  const { updateVideoViewCount } = useVideos();
  
  return (
    <ViewsProvider updateVideoViewCount={updateVideoViewCount}>
      {children}
    </ViewsProvider>
  );
}
