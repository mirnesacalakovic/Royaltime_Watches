interface Props {
    errors: any;
}

function ValidationError({ errors }: Props) {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            {errors && (
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                errors.map((err: string, _i: number) => (
                    <label style={{ marginBottom: 10, fontSize: "14px", lineHeight: "20px" }} color="red">{err}</label>
                ))
            )}
        </div>
    );
}

export default ValidationError;