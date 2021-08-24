const forgotPassMail = ( url, CONTACT_US) => {
    return `
        <div>
            <div style=" background: #005CE4; width:100%;">
                <div style=" padding: 20px 5px; ">
                    <div>
                        <div style=" text-align: center; padding: 0 0 10px; ">
                            <img src="https://res.cloudinary.com/aztec/image/upload/v1628835243/logoaztec_ojo89m.png" alt=""
                                style=" width: 140px; ">
                        </div>
                        <div style=" padding: 20px 4px; background: #fff; border-radius: 10px; ">
                            <div cellpadding="0" cellspacing="0" width="100%">
                                <div align="center">
                                    <br />
                                    <br />
                                    <div
                                        style="font-family:Helvetica,Arial,Helvetica,sans-serif;color:#111111;font-size:14px;line-height:18px;padding:0 0 8px;font:500 24px/22px Arial,Helvetica,sans-serif,Fira;color:#0e2f5a">
                                        Reset your password
                                    </div>
                                    <div style="border-bottom: 1px solid lightsteelblue;"></div>
                                    <div
                                        style="font-family:Helvetica,Arial,Helvetica,sans-serif;color:#111111;font-size:12px;line-height:18px;padding-left:0;padding-right:0;padding:20px 20px 0px;font:500 16px/22px Arial,Helvetica,sans-serif,Fira">
                                        <br>
                                        Someone (hopefully you) has requested a password reset for your AZtecCNC account.
                                        <br>
                                        Just click the button below to set a new password:
                                    </div>
                                    <div>
                                        <a href=${url}
                                            style="font-family:Helvetica,Arial,Helvetica,sans-serif;font-weight:bold;padding:10px;color:#fff;text-decoration:none;display:block;background: #005CE4;width: 240px;border-radius: 10px;margin: 10px;">
                                            Reset your password
                                        </a>
                                    </div>
                                    <div style="padding: 0 20px;">
                                        <br>
                                        <div
                                            style="font-family:Helvetica,Arial,Helvetica,sans-serif;font-size:12px;font-weight:normal">
                                            If the button does not work for any reason, you
                                            can also paste the following into your browser:
                                            <a href=${url}
                                                style="font-family:Helvetica,Arial,Helvetica,sans-serif;font-size:14px;line-height:18px;font-weight:bold;color:#005ce4;font-size:12px;font-weight:normal">${url}</a>
                                        </div>
                                        <br>
                                        <div
                                            style="font-family:Helvetica,Arial,Helvetica,sans-serif;font-size:14px;font-weight:normal">
                                            Note: You must perform this validation within the next 24 hours to keep your new account
                                            enabled.
                                            <br>
                                            <br>
                                            If you encounter any problem, please contact us at<div> ${CONTACT_US}</div>
                                        </div>
                                    </div>
                    
                                    <br />
                                    <br />
                                    <div style=" text-align: center; ">
                                        <div style="border-bottom: 1px solid lightsteelblue;"></div>
                                        <div style="padding: 20px;">
                                            <div
                                                style="font-family:Helvetica,Arial,Helvetica,sans-serif;color:#111111;font-size:14px;line-height:18px;padding:0 0 8px;font:500 18px/20px Arial,Helvetica,sans-serif,Fira;">
                                                Join the Community
                                            </div>
                                            <div>
                                                <div
                                                    style="font-weight:normal;text-align:left;display:block;width:100%;box-sizing:border-box;vertical-align:top"
                                                    width="140">
                                                    <table cellpadding="0" cellspacing="0" style="float:none;margin:0 auto">
                                                        <tbody>

                                                            <tr>
                                                                <td
                                                                    style="font-family:Helvetica,Arial,Helvetica,sans-serif;color:#111111;font-size:28px;line-height:18px">
                                                                    <a href="https://www.facebook.com/AZtec-CNC-108812541505135"
                                                                        style="font-family:Helvetica,Arial,Helvetica,sans-serif;font-size:14px;line-height:18px;font-weight:bold;color:#005ce4;text-decoration:none"
                                                                        target="_blank"
                                                                        data-saferedirecturl="https://www.google.com/url?q=https://www.facebook.com/AZtec-CNC-108812541505135&amp;source=gmail&amp;ust=1628682026251000&amp;usg=AFQjCNGu2oCbKtBhaikV3aH_VMQIliuxKw">
                                                                        <img alt="Facebook"
                                                                            src="https://ci3.googleusercontent.com/proxy/4127NE25R-YHCblryocbyByWdvT8SHsbe2JbNGDzqjW5SzuFaLvmmf0TzDL1FqPaBF0feT8uODI9BgC1-EATZWf2ntgwBQXFwWmUdelkLfVAUukcWcHpshhpF6yhBTYBADhjoQ1tFqIMICKZ9WsOliEBXm0=s0-d-e1-ft#https://cloudinary-res.cloudinary.com/image/upload/w_33,dpr_2.0/v1513241200/mail/ico-facebook.png"
                                                                            style="width:40px;vertical-align:top" width="40"
                                                                            class="CToWUd">
                                                                    </a>
                                                                </td>
                                                                <td width="14"
                                                                    style="font-family:Helvetica,Arial,Helvetica,sans-serif;color:#111111;font-size:28px;line-height:18px">
                                                                </td>
                                                                <td
                                                                    style="font-family:Helvetica,Arial,Helvetica,sans-serif;color:#111111;font-size:28px;line-height:18px">
                                                                    <a href="https://twitter.com/AztecCnc"
                                                                        style="font-family:Helvetica,Arial,Helvetica,sans-serif;font-size:14px;line-height:18px;font-weight:bold;color:#005ce4;text-decoration:none"
                                                                        target="_blank"
                                                                        data-saferedirecturl="https://www.google.com/url?q=https://twitter.com/AztecCnc&amp;source=gmail&amp;ust=1628682026251000&amp;usg=AFQjCNFXGOdFT7jqh_mhqNXYZUviVHkXoQ">
                                                                        <img alt="Twitter"
                                                                            src="https://ci3.googleusercontent.com/proxy/uoJZDPnPqUN78-qki-XsEz76CQhNzmtS1yxVyfTcLw-7kv-r485ghcY0gQWCv47q5zDpRjb8WHTyxYJlxabnWrC-LnbwOZpYN7qcsaVZ9zdP6yIUYEn9CZ3th9QeZxxMfSFn0GIvFRmQv9PXUnwu83Gsmg=s0-d-e1-ft#https://cloudinary-res.cloudinary.com/image/upload/w_33,dpr_2.0/v1513241200/mail/ico-twitter.png"
                                                                            style="width:40px;vertical-align:top" width="40"
                                                                            class="CToWUd">
                                                                    </a>
                                                                </td>
                                                                <td width="14"
                                                                    style="font-family:Helvetica,Arial,Helvetica,sans-serif;color:#111111;font-size:28px;line-height:18px">
                                                                </td>
                                                                <td
                                                                    style="font-family:Helvetica,Arial,Helvetica,sans-serif;color:#111111;font-size:28px;line-height:18px">
                                                                    <a href="https://www.instagram.com/azteccnc"
                                                                        style="font-family:Helvetica,Arial,Helvetica,sans-serif;font-size:14px;line-height:18px;font-weight:bold;color:#005ce4;text-decoration:none"
                                                                        target="_blank"
                                                                        data-saferedirecturl="https://www.google.com/url?q=https://twitter.com/AztecCnc&amp;source=gmail&amp;ust=1628682026251000&amp;usg=AFQjCNFXGOdFT7jqh_mhqNXYZUviVHkXoQ">
                                                                        <img alt="Instagram"
                                                                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/1024px-Instagram_icon.png"
                                                                            style="width:40px;vertical-align:top" width="40"
                                                                            class="CToWUd">
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div align="center">
                            <div style=" text-align: center; padding: 10px; ">
                                <img src="https://res.cloudinary.com/aztec/image/upload/v1628657771/logo192_ms1tie.png" alt=""
                                    style=" width: 80px; ">
                            </div>
                            <div
                                style="font-family:Helvetica,Arial,Helvetica,sans-serif;color:#111111;font-size:12px;line-height:18px;padding:0 0 10px;font:500 12px/18px Arial,Helvetica,sans-serif,Fira;color:#fff">
                                © 2021 AZtecCNC. All rights reserved.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
}

module.exports = forgotPassMail