import React, { useState } from 'react';
import { configToBlueprint } from "@flatfile/v2-shims";
import { useSpace } from '@flatfile/react';

const platformProps = {
    name: "Embedded Space",
    publishableKey: "pk_9da90d75f5ef4de78160a977f1d5e240",
    environmentId: "us_env_FB862z7a",
};

type SpaceProps = {
  setShowSpace: React.Dispatch<React.SetStateAction<boolean>>;
};

const flatfileConfig: any = {
  type: 'Contacts',
  fields: [
      {
          key: 'name',
          label: 'Name',
          description: 'Contact name',
          validators: [
              {validate: 'required'}
          ]
      }
  ]
}


const Space = (props: SpaceProps) => {
    const space = useSpace({
        ...platformProps,
        // @ts-ignore
        workbook: configToBlueprint(flatfileConfig),
        //listener,
        sidebarConfig: {
            showSidebar: false,
        },
        closeSpace: {
            operation: "submitAction",
            onClose: () => props.setShowSpace(false),
        },
    });
    return space;
};

export default function App() {
    const [showSpace, setShowSpace] = useState(false);

    return (
    <div className="App">
        <button
            className="contract"
            onClick={() => {
                setShowSpace(!showSpace);
            }}
        >
            {showSpace === true ? "Close" : "Open and create new"} Space
        </button>
        {showSpace && <Space setShowSpace={setShowSpace} />}
    </div>
    )
}
