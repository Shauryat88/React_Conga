export const EventBus = {

    on(event, callback) {

        document.addEventListener(event, callback);

    },
    once(event, callback) {

        document.addEventListener(event, callback, { once: true });

    },

    emit(event, data) {

        document.dispatchEvent(new CustomEvent(event, { detail: data }));

    },

    off(event, callback) {

        document.removeEventListener(event, callback);

    },

};