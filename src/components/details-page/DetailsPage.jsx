import React, { useEffect, useState } from "react";
import { Button, Icon, Image, Modal, Card } from "semantic-ui-react";

const DetailsPage = ({ modalState, details }) => {
  const [open, setOpen] = useState(modalState);
  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        trigger={<Button>Details</Button>}
      >
        <Modal.Header>Profile Picture</Modal.Header>
        <Modal.Content image scrolling>
          <Card>
            <Card.Content>
              <Card.Header>{details.ServiceName}</Card.Header>
              <Card.Meta>
                <span className="date">{details.ResourceGroup}</span>
              </Card.Meta>
              <Card.Description>{details.Date}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name="rupee" />
                {details.Cost}
              </a>
            </Card.Content>
          </Card>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setOpen(false)} primary>
            Proceed <Icon name="chevron right" />
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};
export default DetailsPage;
