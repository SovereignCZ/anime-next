import withReactContent from "sweetalert2-react-content";
import {default as Swal2} from "sweetalert2";

const MySwal = withReactContent(Swal2)

export function Swal({title, text, isConfirmed, data}) {
    return MySwal.fire({
        customClass: {
            confirmButton: 'btn btn-primary m-2',
            cancelButton: 'btn btn-outline-warning m-2',
        },
        buttonsStyling: false,
        showCancelButton: true,
        confirmButtonText: 'Ano',
        cancelButtonText: 'Ne',
        reverseButtons: true,
        width: "50%",
        title: title,
        icon: 'question',
        background: 'var(--body-bg)',
        color: 'var(--body-bg)',
        html: '<p>' + text + '</p>'
    }).then((result) => {
        if (result.isConfirmed) {
            isConfirmed(data)
        }
    })
}
