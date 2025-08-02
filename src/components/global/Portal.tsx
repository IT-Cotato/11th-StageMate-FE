import {type ReactNode, useEffect, useState} from 'react';
import {createPortal} from 'react-dom';

/**
 * Keeps track of how many Portal instances are using each portalId
 */
const refCounts: Record<string, number> = {};

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
      element.style.zIndex = '10001';
      document.body.appendChild(element);
    }

    refCounts[portalId] = (refCounts[portalId] || 0) + 1;
    setPortalElement(element);
    return () => {
      refCounts[portalId] -= 1;
      if (refCounts[portalId] === 0) {
        delete refCounts[portalId];
        if (element && element.children.length === 0) {
          document.body.removeChild(element);
        }
      }
    };
  }, [portalId]);

  return portalElement ? createPortal(children, portalElement) : null;
};

export default Portal;
