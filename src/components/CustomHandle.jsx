import React from 'react';
import { Handle, useNodeConnections } from '@xyflow/react';

const CustomHandle = (props) => {
  const connections = useNodeConnections({
    handleType: props.type,
  });

  return (
    <Handle
      {...props}
      isConnectable={props.connectioncount === -1 || connections.length < props.connectioncount}
    />
  );
};

export default CustomHandle;
