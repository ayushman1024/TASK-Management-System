'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">frontend documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="dependencies.html" data-type="chapter-link">
                                <span class="icon ion-ios-list"></span>Dependencies
                            </a>
                        </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse" ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-a1783d2e4fe68075f6aa51bb3f5d99fa"' : 'data-target="#xs-components-links-module-AppModule-a1783d2e4fe68075f6aa51bb3f5d99fa"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-a1783d2e4fe68075f6aa51bb3f5d99fa"' :
                                            'id="xs-components-links-module-AppModule-a1783d2e4fe68075f6aa51bb3f5d99fa"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CreateProgramComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CreateProgramComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EnterProgramComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EnterProgramComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ErrorPageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ErrorPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MyTasksComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MyTasksComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewTaskReviewComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NewTaskReviewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegisterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RegisterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SelectPrgmComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SelectPrgmComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TaskCalendarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TaskCalendarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TaskCreatorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TaskCreatorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TaskWorkComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TaskWorkComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TdashboardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TdashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UdashboardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UdashboardComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-a1783d2e4fe68075f6aa51bb3f5d99fa"' : 'data-target="#xs-injectables-links-module-AppModule-a1783d2e4fe68075f6aa51bb3f5d99fa"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-a1783d2e4fe68075f6aa51bb3f5d99fa"' :
                                        'id="xs-injectables-links-module-AppModule-a1783d2e4fe68075f6aa51bb3f5d99fa"' }>
                                        <li class="link">
                                            <a href="injectables/GlobalService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>GlobalService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MaterialModuleImportModule.html" data-type="entity-link">MaterialModuleImportModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PrimengModuleImportModule.html" data-type="entity-link">PrimengModuleImportModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AuthLoginInfo.html" data-type="entity-link">AuthLoginInfo</a>
                            </li>
                            <li class="link">
                                <a href="classes/CodeDTO.html" data-type="entity-link">CodeDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/JwtResponse.html" data-type="entity-link">JwtResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/NewProgram.html" data-type="entity-link">NewProgram</a>
                            </li>
                            <li class="link">
                                <a href="classes/NewTask.html" data-type="entity-link">NewTask</a>
                            </li>
                            <li class="link">
                                <a href="classes/Program.html" data-type="entity-link">Program</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProgramList.html" data-type="entity-link">ProgramList</a>
                            </li>
                            <li class="link">
                                <a href="classes/Register.html" data-type="entity-link">Register</a>
                            </li>
                            <li class="link">
                                <a href="classes/Role.html" data-type="entity-link">Role</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignUpInfo.html" data-type="entity-link">SignUpInfo</a>
                            </li>
                            <li class="link">
                                <a href="classes/Task.html" data-type="entity-link">Task</a>
                            </li>
                            <li class="link">
                                <a href="classes/TaskCalendar.html" data-type="entity-link">TaskCalendar</a>
                            </li>
                            <li class="link">
                                <a href="classes/TaskCalendarList.html" data-type="entity-link">TaskCalendarList</a>
                            </li>
                            <li class="link">
                                <a href="classes/TaskList.html" data-type="entity-link">TaskList</a>
                            </li>
                            <li class="link">
                                <a href="classes/TaskRecord.html" data-type="entity-link">TaskRecord</a>
                            </li>
                            <li class="link">
                                <a href="classes/TaskRecordList.html" data-type="entity-link">TaskRecordList</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link">User</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserList.html" data-type="entity-link">UserList</a>
                            </li>
                            <li class="link">
                                <a href="classes/Work.html" data-type="entity-link">Work</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link">AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GlobalService.html" data-type="entity-link">GlobalService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProgramService.html" data-type="entity-link">ProgramService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TaskService.html" data-type="entity-link">TaskService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TokenStorageService.html" data-type="entity-link">TokenStorageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link">UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/AuthInterceptor.html" data-type="entity-link">AuthInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});