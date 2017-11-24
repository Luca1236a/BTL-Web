import {FlowRouter} from "meteor/kadira:flow-router";
import {BlazeLayout} from "meteor/kadira:blaze-layout";
// import {FlowLayout} from 'meteor/meteorhacks:flow-layout';
// Import needed templates
import "../../ui/layouts/body/body.js";
import "../../ui/pages/home/home.js";
import "../../ui/pages/not-found/not-found.js";
// import "../../ui/pages/register/register.js";
// import "../../ui/pages/login/login.js";
import "../../ui/pages/profile/profile.js";
import "../../ui/pages/upload/upload.js";
import "../../ui/pages/join/join.js";
import "../../ui/pages/job-creation/job-creation.js";
import "../../ui/pages/job-category/job-category.js";
import "../../ui/pages/job-type/job-type.js";
import "../../ui/pages/job-detail/job-detail.js";
import "../../ui/pages/job-list/job-list.js";
import "../../ui/pages/not-authorization/not-authorization.js";
import "../../ui/pages/landing-page/landing-page.js";
import "../../ui/pages/reset-password/reset-password.js";
import "../../ui/pages/job-created/job-created.js";
import "../../ui/pages/contact/contact.js";
// import "../../ui/pages_blog/home/home.js";
// import "../../ui/pages_blog/post-category/post-category.js";
// import "../../ui/pages_blog/category/category";
// import "../../ui/pages_blog/tag/tag";
// import "../../ui/pages_blog/post-creation/post-creation.js";
// import "../../ui/pages_blog/post/post-page.js";
// import "../../ui/pages_blog/post-edit/post-edit.js";

import "../../ui/pages/job-editing/job-editing";
import "../../ui/pages/search/search.js"
import "../../ui/pages/user-management/user-management"

// Tracker.autorun(function() {
//     FlowRouter.watchPathChange();
//     // var context = FlowRouter.current();
// 	// use context to access the URL state
// 	BlazeLayout.reset();
// });
// Scroll to top when data change or route change
FlowRouter.triggers.enter([ () => { window.scrollTo(0, 0); } ]);

if (Meteor.isClient) {
    // This function will wait Roles and FlowRoute subscribe done
    FlowRouter.wait();
    Tracker.autorun(function() {
        if (Roles.subscription.ready() && !FlowRouter._initialized) {
            FlowRouter.initialize()
        }
    });
}

// Set up all routes in the app
FlowRouter.route(['/', '/home'], {
    name: 'App.home',
    action() {
        BlazeLayout.render('landingPage', {main: 'homepage'});
        // FlowRouter.wait();
        // triggersEnter: [reRenderHomePage]
    },
});


// function reRenderHomePage(context) {
//     BlazeLayout.reset();
// }

FlowRouter.notFound = {
    action() {
        BlazeLayout.render('pageNotFound', {main: 'pageNotFound'});
    },
};

function isOwner(ctx, redirect) {
    if (!Meteor.userId()) {
        BlazeLayout.reset();
        redirect("/not-authorization");
    }
    if (Roles.userIsInRole(Meteor.userId(), ["admin", 'owner'])) {
        console.log('Owner');
    } else {
        console.log('Slave');
        // FlowRouter.go('/');
        BlazeLayout.reset();
        redirect("/not-authorization");

    }
}

var ownerRoutes = FlowRouter.group({
    name: "owner",
    triggersEnter: [isOwner]
});
// const scrollToTopRoutes = FlowRouter.group({
//     name: 'scrollToTopRoutes',
//     triggersEnter: [() => {
//         window.scrollTo(0, 0);
//     }],
// });

function isAdmin(ctx, redirect) {
    if (!Meteor.userId()) {
        redirect("/not-authorization");
    } else if (!Roles.userIsInRole(Meteor.userId(), ["admin"])) {
        console.log('Not Admin');
        redirect("/not-authorization");
        BlazeLayout.reset();
    } else if (Roles.userIsInRole(Meteor.userId(), ["admin"])) {
        console.log('Is Admin');
        // FlowRouter.go('/');
    }
}

var adminRoutes = FlowRouter.group({
    name: "admin",
    triggersEnter: [isAdmin]
});

FlowRouter.route('/register', {
    name: 'App.register',
    action() {
        BlazeLayout.render('App_body', {main: 'register'});
    },
});

FlowRouter.route('/login', {
    name: 'App.login',
    action() {
        BlazeLayout.render('App_body', {main: 'login'});
    },
});


FlowRouter.route('/join', {
    name: 'App.join',
    action() {
        BlazeLayout.render('App_body', {main: 'join'});
    },
});

FlowRouter.route('/contact', {
    name: 'App.contact',
    action() {
        BlazeLayout.render('App_body', {main: 'contact'});
    },
});

FlowRouter.route('/upload', {
    name: 'App.upload',
    action() {
        BlazeLayout.render('App_body', {main: 'upload'});
    },
});

adminRoutes.route('/job-category', {
    name: 'App.job-category',
    action() {
        BlazeLayout.render('App_body', {main: 'job-category'});
    },
});
FlowRouter.route('/user-management', {
    name: 'App.user-management',
    action() {
        BlazeLayout.render('App_body', {main: 'userManagement'});
    },
});
FlowRouter.route('/user-management/page/:page', {
    name: 'App.user-management',
    action() {
        BlazeLayout.render('App_body', {main: 'userManagement'});
    },
});



adminRoutes.route('/job-type', {
    name: 'App.job-type',
    action() {
        BlazeLayout.render('App_body', {main: 'job-type'});
    }
});

FlowRouter.route('/not-authorization', {
    name: 'App.not-authorization',
    action() {
        BlazeLayout.render('App_body', {main: 'notAuthorization'});
    },
});

//
// FlowRouter.route('/job-detail', {
//     name: 'App.job-detail',
//     action() {
//         BlazeLayout.render('App_body', {main: 'job-detail'});
//     },
// });

FlowRouter.route("/job/:cat/:id", {
    name: "App.jobDetail",
    action: function (params) {
        //...
        BlazeLayout.render('App_body', {main: 'jobDetail'});
    }
});
adminRoutes.route("/job/:cat/:id/edit", {
    name: "App.jobDetail",
    action: function (params) {
        //...
        BlazeLayout.render('App_body', {main: 'jobEditing'});
    }
});

FlowRouter.route("/job/:cat", {
    name: "App.job-detail",
    action: function (params) {
        BlazeLayout.render('App_body', {main: 'job-detail'});
    }
});

// var params = {cat: "meteor", id: "abc"};
// var queryParams = {show: "yes", color: "black"};
//
// var path = FlowRouter.path("blogPostRoute", params, queryParams);
// console.log(path); // prints "/blog/meteor/abc?show=yes&color=black"

FlowRouter.route('/job-list/page/:page', {
    name: 'App.job-list',
    action() {
        BlazeLayout.render('App_body', {main: 'job-list'});
    },
});
FlowRouter.route('/job-list', {
    name: 'App.job-list',
    action() {
        BlazeLayout.render('App_body', {main: 'job-list'});
    },
});


var loggedIn;
loggedIn = FlowRouter.group({
    triggersEnter: [
        function () {
            var route;
            if ((Meteor.user() || Meteor.userId())) {
                return FlowRouter.go("/home");
            }
        }
    ]
});
FlowRouter.route('/reset-password/:token', {
    name: 'App.reset-password',
    action() {
        BlazeLayout.render('App_body', {main: 'ResetPassword'});
    },
});

loggedIn.route('/forgot', {
    name: 'App.reset-password',
    action() {
        BlazeLayout.render('App_body', {main: 'ForgotPassword'});
    },
});


var loggedOut;
loggedOut = FlowRouter.group({
    triggersEnter: [
        function () {
            var route;
            if (!(Meteor.loggingIn() || Meteor.userId())) {
                route = FlowRouter.current();
                if (route.route.name !== "login") {
                    Session.set("redirectAfterLogin", route.path);
                }
                return FlowRouter.go("/join");
            }
        }
    ]
});

FlowRouter.route('/profile/:section/page/:page', {
    name: 'App.profile.history',
    action() {
        BlazeLayout.render('App_body', {main: 'profile'});
    },
});

loggedOut.route('/profile/:section', {
    name: 'App.profile',
    action() {
        BlazeLayout.render('App_body', {main: 'profile'});
    },
});

loggedOut.route('/profile/', {
    name: 'App.profile',
    action() {
        BlazeLayout.render('App_body', {main: 'profile'});
    },
});
ownerRoutes.route("/job-created", {
    name: "job-created",
    action: function () {
        BlazeLayout.render("App_body", {main: "jobCreated"});
    }
});

ownerRoutes.route('/job-creation', {
    name: 'App.job-creation',
    action() {
        BlazeLayout.render('App_body', {main: 'job-creation'});
    },
});
// FlowRouter.route('/blog/', {
//     name: 'App.blog',
//     action() {
//         BlazeLayout.render('App_body', {main: 'App_home_blog'});
//     },
// });
FlowRouter.route('/notification', {
    name: 'App.notification',
    action() {
        BlazeLayout.render('App_body', {main: 'shownoti'});
    },
});

FlowRouter.route('/notification/page/:page',{
    name: 'App.notification',
    action(){
        BlazeLayout.render('App_body',{main: 'shownoti'});
    },
});

// FlowRouter.route('/blog/page/:page', {
//     name: 'App.blog',
//     action() {
//         BlazeLayout.render('App_body', {main: 'App_home_blog'});
//     },
// });
// loggedOut.route('/blog/post-creation', {
//     name: 'App.post-creation',
//     action() {
//         BlazeLayout.render('App_body', {main: 'post_creation'});
//     },
// });
// FlowRouter.route('/blog/:postId/page/:page/', {
//     name: 'App.post',
//
//     action: function() {
//         BlazeLayout.render('App_body', {main: 'Postshow'});
//     }
// });

// FlowRouter.route("/blog/:postId/", {
//     name: "App.post",
//     action: function() {
//
//         BlazeLayout.render('App_body', {main: 'Postshow'});
//     }
// });
//
// FlowRouter.route("/blog/:postId/edit", {
//     name: "App.post_edit",
//     action: function(params) {
//         //...
//         BlazeLayout.render('App_body', {main: 'post_edit'});
//     }
// });
// FlowRouter.route("/blog/category/:slug", {
//     name: "App.category",
//     action: function(params) {
//         //...
//         BlazeLayout.render('App_body', {main: 'category'});
//     }
// });
// FlowRouter.route("/blog/tag/:slug", {
//     name: "App.tag",
//     action: function(params) {
//         //...
//         BlazeLayout.render('App_body', {main: 'tag'});
//     }
// });

// FlowRouter.route('/blog/tag', {
//     name: 'App.tag',
//     action() {
//         BlazeLayout.render('App_body', { main: 'tag' });
//     },
// });

// https://medium.com/@satyavh/using-flow-router-for-authentication-ba7bb2644f42