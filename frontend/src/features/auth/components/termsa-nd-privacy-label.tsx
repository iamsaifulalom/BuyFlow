import Link from 'next/link'

export default function TermsAndPrivacyLabel() {
    return (
        <span className="text-[16px] text-muted-foreground" >
            I agree with{' '}
            <Link href="/privacy-policy" className="font-bold text-foreground" > Privacy Policy</ Link > {' '}
            and{' '}
            <Link href="/terms-of-use" className="font-bold text-foreground" > Terms of Use </Link>
        </span>
    )
}
