import { FormGroup } from "reactstrap";

const MailchimpForm = () => {
  return (
    <div id="mc_embed_signup" className="mailchimpForm">
      <form action="https://utdallas.us3.list-manage.com/subscribe/post?u=53d06e2114d1c4b311405125d&id=5115f02a76" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" noValidate>
        <div id="mc_embed_signup_scroll">
          <input type="email" name="EMAIL" placeholder="Your email" className="required email" id="mce-EMAIL"/>
          <div id="mce-responses" className="clear">
            <div className="response" id="mce-error-response" style={{display: 'none'}} />
            <div className="response" id="mce-success-response" style={{display: 'none'}} />
          </div>    
          
          <div style={{position: 'absolute', left: '-5000px'}} aria-hidden="true"><input type="text" name="b_53d06e2114d1c4b311405125d_5115f02a76" tabIndex={-1} defaultValue /></div>
          <div className="clear"><button type="submit" defaultValue="Subscribe" name="subscribe" id="mc-embedded-subscribe" className="button">Subscribe</button></div>
        </div>
      </form>
    </div>
  )
};

export default MailchimpForm;