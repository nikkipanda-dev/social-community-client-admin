import { Outlet } from "react-router-dom";
import { styled } from "../../../stitches.config";

import Sidebar from "../../widgets/Sidebar";
import Section from '../../core/Section';
import Row from '../../core/Row';
import Column from '../../core/Column';

const DashboardWrapper = styled('div', {
    paddingTop: '100px',
    maxWidth: '1700px',
});

export const Dashboard = () => {
    return (
        <Section className="mb-5">
            <DashboardWrapper className="mx-auto">
                <Row className="m-0">
                    <Column className="col-sm-5 col-md-4 col-lg-3">
                        <Sidebar />
                    </Column>
                    <Column className="col-sm-7 col-md-8 col-lg-9 bg-light">
                        <Outlet />
                    </Column>
                </Row>
            </DashboardWrapper>
        </Section>
    )
}

export default Dashboard;