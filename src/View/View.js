import Top from './Top';
import Side from './Side';

export class View {
    header;
    sidebar;
    model;

    constructor(m){
        this.model = m;
        this.header = <Top fps = {20}/>;
        this.sidebar = <Side />
        ;
    }

    toggleSidebar(){
        this.model.toggleSidebar();
        this.sidebar.handleToggle();
    }

}

export default View;