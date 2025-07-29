import {type ReactNode, useEffect, useState} from 'react';
import {createPortal} from 'react-dom';

interface PortalProps {
  children: ReactNode;
  portalId?: string;
}

const Portal = ({children, portalId = 'portal-root'}: PortalProps) => {
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let element = document.getElementById(portalId);

    if (!element) {
      element = document.createElement('div');
      element.id = portalId;
      element.style.position = 'relative';
      element.style.zIndex = '9999';
      document.body.appendChild(element);
    }

    setPortalElement(element);

    return () => {
      if (element && element.children.length === 0) {
        document.body.removeChild(element);
      }
    };
  }, [portalId]);

  return portalElement ? createPortal(children, portalElement) : null;
};

export default Portal;
